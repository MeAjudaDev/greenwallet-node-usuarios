const usersRepository = require('../repositories/UsersRepository');
const { encryptString } = require('./encryptionService');

exports.createUser = async (name, email, password) => {

    const encryptedPassword = await encryptString(password);

    await usersRepository.create({ 
        name, 
        email, 
        password: encryptedPassword
    });
}