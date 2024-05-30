const jwt = require('jsonwebtoken');

const generatedToken = (id, email, username) => {
    const token = jwt.sign({id, email, username}, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}

module.exports = generatedToken;

