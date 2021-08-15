const bcryptjs = require('bcryptjs');

const saltRounds = 8;

exports.encryptString = (string) => {
    return bcryptjs.hash(string, saltRounds);
}

exports.compareString = (value, encryptString) => {
    return bcryptjs.compare(value, encryptString)
}