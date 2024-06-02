const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { ElasticClient } =  require("../config/KabanaES");
const Imap = require("imap-simple")
const {simpleParser} = require("mailparser")





const connectEmail = catchAsyncError(async (req, res, next) => {

    try {

        const userId = req.user.id

        const {type, email, password} = req.body


        const isEmailConnected = await ElasticClient.search({
            index: 'mailbox_details',
            body: {
                query: { 
                    bool: {
                        must: [
                            {'match':{"user_id": userId}},
                            {'match':{"mail": email}} 
                        ]
                    } 
                    
                },
                "_source": ['user_id', 'mail', 'password']
            }
        })
        if(isEmailConnected.hits.total.value > 0){
            const errorMessage = "Mail already connected"
            console.log(errorMessage);
            return next(new errorHandler(errorMessage, 500));
        }

       await ElasticClient.index({
            index: 'mailbox_details',
            body: {
                user_id: userId,
                type: type,
                mail: email,
                password: password
            }
        });

       


    } catch (error) {
        console.log("error",error)
        return next(new errorHandler(error, 500));
    }

})


const getAllConnectedMails = catchAsyncError(async (req, res, next) => {

    try {

        const userId = req.user.id


        const connectedMails = await ElasticClient.search({
            index: 'mailbox_details',
            body: {
                query: { 
                    bool: {
                        must: [
                            {'match':{"user_id": userId}},
                        ]
                    } 
                    
                },
                "_source": ['user_id', 'mail', 'type', 'password']
            }
        })

        const mails = connectedMails.hits.hits.map(hit => hit._source);

        res.status(201).json({
            success: true,
            message: "Connected mails retrived successfully",
            connectedMails: mails
        });


    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})


const getAllMailsForSelectedMail = catchAsyncError(async (req, res, next) => {

    try {

        const userId = req.user.id

        const {type, email, password} = req.body


        let imapConfig;
        if (type === "outlook") {
            imapConfig = {
                imap: {
                    user: email,
                    password: "btkhvyduskqghukh",
                    host: 'outlook.office365.com',
                    port: 993,
                    tls: true,
                    authTimeout: 10000
                }
            };
        }

        console.log("imapConfig", imapConfig)

        Imap.connect(imapConfig).then(connection => {
            connection.openBox('INBOX').then(() => {
                const searchCriteria = ['ALL'];
                const fetchOptions = {
                    bodies: ['HEADER.FIELDS (SUBJECT DATE)', 'TEXT'],
                    markSeen: false
                };

                return connection.search(searchCriteria, fetchOptions);
            }).then(async messages => {
                for ( const item of messages) {
                    const headerPart = item.parts.find(part => part.which === 'HEADER.FIELDS (SUBJECT)');
                    const envelope = item.parts.find(part => part.which === 'ENVELOPE');
            
                    if (!headerPart || !envelope) {
                        console.error("Missing header or envelope part in message:", item);
                        continue;
                    }
            
                    const subject = headerPart.body;
                    const date = envelope.date;
        
                    await ElasticClient.index({
                        index: 'email_messages',
                        body: {
                            user_id: userId,
                            email_id: 2,
                            email: email,
                            body: JSON.stringify(item) 
                        }
                    });
                    console.log("sync", sync);
                }
            }).catch(err => {
                console.error("Error searching emails:", err);
                return next(new errorHandler(err.message, 500));
            });
        }).catch(err => {
            console.error("Error connecting to IMAP server:", err);
            return next(new errorHandler(err.message, 500));
        });



        const allMails = await ElasticClient.search({
            index: 'email_messages',
            body: {
                query: { 
                    bool: {
                        must: [
                            {'match':{"user_id": userId}},
                        ]
                    } 
                    
                },
                "_source": ['user_id', 'email_id', 'body']
            }
        })

        const mails = allMails.hits.hits.map(hit => hit._source);


        res.status(201).json({
            success: true,
            message: "Connected mails retrived successfully",
            allMails: mails
        });


    } catch (error) {
        return next(new errorHandler(error, 500));
    }

})

module.exports = {
    connectEmail,
    getAllConnectedMails,
    getAllMailsForSelectedMail
}

// await ElasticClient.deleteByQuery({
                            //     index: 'email_messages',
                            //     body: {
                            //         query: { 
                            //             bool: {
                            //                 must: [
                            //                     {'match':{"user_id": userId}},
                            //                     {'match': {"email": email}}
                            //                 ]
                            //             } 
                                        
                            //         },
                            //     }
                            // });