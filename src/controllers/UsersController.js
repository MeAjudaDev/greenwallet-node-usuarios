const createUsersService = require('../services/UsersService');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await createUsersService.createUser(name, email, password);
    return res.status(200).send();

  } catch (err) {
    console.error(err);
    return res.status(400).json(err.message);
  }
}

exports.activationAccount = async (req, res) => {
  try {
    const { token } = req.query;
    const { code } = req.body

    await createUsersService.activationAccount(token, code);

    return res.status(200).json("Account activated!");

  } catch (err) {
    console.error(err);
    return res.status(400).json(err.message);
  }
}