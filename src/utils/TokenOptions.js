const jwt = require('jsonwebtoken');

exports.generateToken = (payload, expiresIn) => {
    return jwt.sign( payload, process.env.JWT_KEY, {expiresIn: expiresIn});
}