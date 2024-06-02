const { ElasticClient } =  require("./KabanaES");


async function createIndices() {
    // await ElasticClient.indices.create({
    //     index: 'user',
    //     body: {
    //         mappings: {
    //             properties: {
    //                 username: { type: 'keyword' },
    //                 email: { type: 'keyword' },
    //                 password: { type: 'text' },
    //                 createdAt: { type: 'date' },
    //                 updatedAt: { type: 'date' }
    //             }
    //         }
    //     }
    // });
    // console.log("user indices created")

    await ElasticClient.indices.create({
        index: 'email_messages',
        body: {
            mappings: {
                properties: {
                    user_id: { type: 'keyword' },
                    email_id: { type: 'keyword' },
                    email: { type: 'text'},
                    body: { type: 'text' },
                }
            }
        }
    });
    console.log("email_messages indices created")

    // await ElasticClient.indices.create({
    //     index: 'mailbox_details',
    //     body: {
    //         mappings: {
    //             properties: {
    //                 user_id: { type: 'keyword' },
    //                 type: { type: 'text' },
    //                 mail: { type: 'text'},
    //                 password: {type: 'text'}
    //             }
    //         }
    //     }
    // });
    // console.log("mailbox_details indices created")
}

createIndices().catch(console.log);
