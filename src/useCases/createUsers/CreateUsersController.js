const createUsersService = require('./CreateUsersService');

exports.handle = (req, res) => {
    const { name, email, password } = req.body;

    createUsersService.execute( name, email, password );

    return res.status(200).send();
}