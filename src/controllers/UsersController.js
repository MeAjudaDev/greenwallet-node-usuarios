const createUsersService = require('../services/UsersService');

exports.createUser = async (req, res) => {
    const { name, email, password, activation_code } = req.body;

    const user = await createUsersService.createUser( name, email, password, activation_code );

    return res.status(200).json(user);
}