const createUsersService = require('../services/UsersService');

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    await createUsersService.createUser( name, email, password );

    return res.status(200).json(users);
}