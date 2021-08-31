const createUsersService = require("../services/UsersService");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await createUsersService.createUser(name, email, password);
    return res.status(200).json(user);

  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

exports.activationAccount = async (req, res) => {
  try {
    const { code, email } = req.body;

    await createUsersService.activationAccount(email, code);

    return res.status(200).json("Account activated!");
  } catch (err) {
    console.error(err);
    return res.status(400).json(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const login = await createUsersService.login(email, password);

    if (!login.logged) {
      return res.status(403).json({ message: login.msg });
    }

    return res.status(200).json({ user: login.user, jwt: login.jwt });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
}

exports.userAuthentication = async (req, res) => {
  try {
    const { email, password } = req.body;

    const auth = await createUsersService.userAuthentication(email, password);

    return res.status(200).json(auth);

  } catch (err) {
    return res.status(205).json({ message: err.message });
  }
}

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
