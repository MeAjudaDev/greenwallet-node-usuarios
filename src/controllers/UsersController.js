const createUsersService = require("../services/UsersService");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await createUsersService.createUser(name, email, password);
    return res.status(200).send();
  } catch (err) {
    console.error(err);
    return res.status(400).json(err.message);
  }
};

exports.activationAccount = async (req, res) => {
  try {
    const { token } = req.query;
    const { code } = req.body;

    await createUsersService.activationAccount(token, code);

    return res.status(200).json("Account activated!");
  } catch (err) {
    console.error(err);
    return res.status(400).json(err.message);
  }
};
exports.sendUserCode = async (req, res) => {
  try {
    const { email } = req.body;
    const userAlreadyExists = await usersRepository.findUserByEmail(email);
    if (!userAlreadyExists) {
      console.error(err);
      return res.status(400).json(err.message);
    } else {
      const activation_code = generateCodeFromLength(4);
      await mailProvider(
        email,
        "Código para recuperação de senha",
        `<h1>Olá ${email}!</h1> <h3>Seu código de ativação é: <br><br> ${activation_code}</h3>`
      );
    }
  } catch (err) {
    throw new Error(`This ${email}  is invalid`);
  }
};
