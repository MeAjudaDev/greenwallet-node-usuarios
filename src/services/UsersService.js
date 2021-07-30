const usersRepository = require('../repositories/UsersRepository');

exports.createUser = async (name, email, password) => {

    await usersRepository.create({ name, email, password });
}
