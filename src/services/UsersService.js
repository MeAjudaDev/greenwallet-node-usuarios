const usersRepository = require('../repositories/UsersRepository');

exports.createUser = async (name, email, password, activation_code) => {

    
    await usersRepository.create({ name, email, password, activation_code });
}
