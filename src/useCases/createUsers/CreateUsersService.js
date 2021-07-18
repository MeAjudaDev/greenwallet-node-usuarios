const usersRepository = require('../../repositories/UsersRepository');

exports.execute = (name, email, password) => {
    usersRepository.create({ name, email, password });
}
