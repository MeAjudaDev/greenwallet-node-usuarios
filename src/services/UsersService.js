const usersRepository = require("../repositories/UsersRepository");
const tokenOptions = require("../utils/TokenOptions");
const { encryptString, compare } = require("./encryptionService");
const { mailProvider } = require("../provider/sendMail/SendMailProvider");
const { generateCodeFromLenght } = require("../utils/GenerateRandomCode");

exports.createUser = async (name, email, password) => {
  try {
    const encryptedPassword = await encryptString(password);
    const activation_code = generateCodeFromLenght(4);

    const userAlreadyExists = await usersRepository.findUserByEmail(email);

    if (userAlreadyExists[0].length > 0) {
      throw new Error("E-mail is already in use!");
    }

    await usersRepository.create({
      name,
      email,
      password: encryptedPassword,
      activation_code,
    });

    const token = tokenOptions.generateToken({ email }, "5h");
    const link = `${process.env.USER_ACTIVATION_URL}${token}`;

    await mailProvider(
      email,
      "Ativação de Conta",
      `<h1>Olá ${name}!</h1> <h3>Seu código de ativação é: <br><br> ${activation_code}</h3> <p>Link para realizar a ativação:</p> <br> <a><strong>${link}</strong></a>`
    );
  } catch (err) {
    throw new Error(`This e-mail (${email}) is already in use!`);
  }
};

exports.activationAccount = async (token, code) => {
  try {
    const tokenInfo = tokenOptions.verifyToken(token);

    if (!tokenInfo.email) return false;

    const email = tokenInfo.email;

    const user = await usersRepository.findUserByEmail(email);

    if (code === user[0][0].activation_code) {
      return await usersRepository.updateStateColumn(email, "A");
    } else {
      throw new Error("Invalid code!");
    }
  } catch (err) {
    throw new Error(`This code (${code}) is invalid!`);
  }
};

exports.login = async (email, password) => {
  try {
    const [[user]] = await usersRepository.findUserForLogin(email);

    if (!user) {
      return {
        logged: false,
        msg: 'Não foi possível encontrar um usuário com o email inserido'
      };
    }

    const check = await compare(password, user.password);

    if (!check) {
      return {
        logged: false,
        msg: 'Senha inválida'
      };
    }

    const token = tokenOptions.generateToken({ email: user.email }, '5h');

    if (user.state !== 'A') {
      const link = `${process.env.USER_ACTIVATION_URL}${token}`;

      await mailProvider(
        email,
        "Ativação de Conta",
        `<h1>Olá ${user.name}!</h1> <h3>Seu código de ativação é: <br><br> ${user.activation_code}</h3> <p>Link para realizar a ativação:</p> <br> <a><strong>${link}</strong></a>`
      );
    }

    user.password = undefined;

    return {
      logged: true,
      user,
      jwt: token
    }

  } catch (err) {
    throw new Error(err.message)
  }
}
