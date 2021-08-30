const usersServices = require('../services/UsersService');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await usersServices.createUser(name, email, password);
    return res.status(200).json(user);

  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
}

exports.activationAccount = async (req, res) => {
  try {
    const { token } = req.query;
    const { code } = req.body

    await usersServices.activationAccount(token, code);

    return res.status(200).json("Account activated!");

  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
}

exports.userAuthentication = async (req, res) => {
  try {
    const { email, password } = req.body;

    const auth = await usersServices.userAuthentication(email, password);

    return res.status(200).json(auth);

  } catch (err) {
    return res.status(205).json({ message: err.message });
  }
}