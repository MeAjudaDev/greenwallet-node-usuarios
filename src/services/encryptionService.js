const bcryptjs = require('bcryptjs');

const saltRounds = 8;

exports.encryptString = (string) => {

    return bcryptjs.hash(string, saltRounds);
}