const bcryptjs = require('bcryptjs');

const saltRounds = 8;

exports.encryptString = (string) => {

    return bcryptjs.hash(string, saltRounds);
}

exports.compare = async (password, userPassword) => {
    const comp = await bcryptjs.compare(password, userPassword).then((result) => {
        return result;
    });

    return comp;
}