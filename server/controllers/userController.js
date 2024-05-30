const bcrypt = require("bcryptjs");
const generatedToken = require("../utils/jwtToken");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const setTokenCookie = require("../utils/sendToken");
const { v4: uuidv4 } = require("uuid");
const { ElasticClient } =  require("../config/KabanaES");


const registerUser = catchAsyncError(async (req, res, next) => {

    try {
        const { username, email, password} = req.body;

        const existingUser = await ElasticClient.search({
            index: 'user',
            body: {
                query: {
                    bool: {
                        should: [
                            { match: { username } },
                            { match: { email } }
                        ]
                    }
                }
            }
        });

        if (existingUser.hits.total.value > 0) {
            return next(new errorHandler("User already exists", 400));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const uniqueId = `${uuidv4()}-${Date.now()}`;

        const token = generatedToken({id: uniqueId, username, email });


        const user = {
            id: uniqueId,
            username,
            email,
            password: hashedPassword,
            token,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const userResponse = await ElasticClient.index({
            index: 'user',
            id: uniqueId,
            body: user
        });
        console.log("User response from Elasticsearch:", userResponse);


        setTokenCookie(res, token);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: userResponse._id,
                username: user.username,
                email: user.email
            },
            token,
        });
        
    } catch (error) {
        console.log("error",error)
        return next(new errorHandler(error, 500));
    }

})


const loginUser = catchAsyncError(async (req, res, next) => {
    try {
        const { usernameOrEmail, password } = req.body;

        const userResult = await ElasticClient.search({
            index: 'user',
            body: {
                query: {
                    bool: {
                        should: [
                            { match: { username: usernameOrEmail } },
                            { match: { email: usernameOrEmail } }
                        ]
                    }
                }
            }
        });

        if (userResult.hits.total.value === 0) {
            return next(new errorHandler("User not found", 404));
        }

        // Retrieve user data
        const userData = userResult.hits.hits[0]._source;
        const { id, username, email, password: hashedPassword } = userData;

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if (!passwordMatch) {
            return next(new errorHandler("Invalid password", 401));
        }

        const token = generatedToken({ id, username, email });

        setTokenCookie(res, token);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id,
                username,
                email
            },
            token
        });
    } catch (error) {
        console.error("Error occurred during login:", error);
        return next(new errorHandler(error, 500));
    }
});



module.exports = {
    registerUser,
    loginUser
};