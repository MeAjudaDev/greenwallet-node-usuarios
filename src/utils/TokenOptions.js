const jwt = require('jsonwebtoken');

exports.generateToken = (payload, expiresIn) => {
    return jwt.sign( payload, process.env.JWT_KEY, {expiresIn: expiresIn});
}

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_KEY);
}