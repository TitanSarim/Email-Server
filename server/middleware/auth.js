const errorHandler = require('../utils/errorHandler.js');
const catchAsyncError = require('../middleware/catchAsyncError.js');
const jwt  = require("jsonwebtoken");
const { ElasticClient } =  require("../config/KabanaES");

const isAuthenticatedUser = catchAsyncError(async(req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
        console.log("token", token)
    } else if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }

    if(!token) {
        return next(new errorHandler("Please login to access this resource", 401))
    }   

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        const { body: userResponse } = await ElasticClient.search({
            index: 'user',
            body: {
                query: {
                    match: { id: decodedData.id }
                },
                _source: ['id', 'email', 'username', 'role']
            }
        });

        if(userResponse.hits.total.value === 0) {
            return next(new errorHandler("User not found", 401))
        }

        const user = userResponse.hits.hits[0]._source;

        const userData = {
            id: user.id,
            email: user.email,
            username: user.username,
        }

        req.user = userData
        next();

    } catch(error) {
        return next(new errorHandler(error, 403))
    }
});

module.exports = {
    isAuthenticatedUser
}