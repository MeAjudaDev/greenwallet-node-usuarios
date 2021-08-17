const usersRepository = require('../repositories/UsersRepository');
const tokenOptions = require('../utils/TokenOptions');
const encryptionService = require('./encryptionService');
const sendMailService = require('./sendMailService');
const { generateCodeFromLenght } = require('../utils/GenerateRandomCode');

exports.createUser = async (name, email, password) => {
  try {
    const encryptedPassword = await encryptionService.encryptString(password);
    const activation_code = generateCodeFromLenght(4);

    const [userAlreadyExists] = await usersRepository.findUserByEmail(email);

    if (userAlreadyExists.length > 0) {
      throw new Error("E-mail is already in use!");
      return null;
    }

    await usersRepository.create({
      name,
      email,
      password: encryptedPassword,
      activation_code
    });

    await sendMailService.activationAccountMail(name, email, activation_code);

  } catch (err) {
    console.error(err);
    throw new Error(`This e-mail (${email}) is already in use!`);
  }
}

exports.activationAccount = async (token, code) => {
  try {
    const tokenInfo = tokenOptions.verifyToken(token);

    if (!tokenInfo.email) return false;

    const email = tokenInfo.email;

    const [[user]] = await usersRepository.findUserByEmail(email);

    if (code === user.activation_code) {
      return await usersRepository.updateStateColumn(email, 'A');
    } else {
      throw new Error("Invalid code!")
    }

  } catch (err) {
    throw new Error(`This code (${code}) is invalid!`);
  }

}

exports.userAuthentication = async (email, password) => {
  try {
    const [[user]] = await usersRepository.findUserByEmail(email);

    const passwordMatch = await encryptionService.compareString(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect!");
    }

    const token = tokenOptions.generateToken({}, '1h');

    const tokenReturn = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }

    if (user.state != 'A') {
      const tokenReturnMessage = { ...tokenReturn, message: 'Ative sua conta!' }
      return tokenReturnMessage;
    }

    return tokenReturn;

  } catch (error) {
    throw new Error("Email or password incorrect!");
  }
}