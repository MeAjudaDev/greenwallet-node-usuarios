const usersRepository = require('../repositories/UsersRepository');
const { encryptString } = require('./encryptionService');
const { mailProvider } = require('../provider/sendMail/SendMailProvider');
const { generateToken } = require('../utils/TokenOptions');
const { generateCodeFromLenght } = require('../utils/GenerateRandomCode');

exports.createUser = async (name, email, password) => {

    const encryptedPassword = await encryptString(password);
    const activation_code = generateCodeFromLenght(4)

    await usersRepository.create({ 
        name, 
        email, 
        password: encryptedPassword,
        activation_code
    });

    const token = generateToken({}, '5h');
    const link = `${process.env.USER_ACTIVATION_URL}${token}`;

    await mailProvider(email, "Ativação de Conta", `<h1>Olá ${name}!</h1> <h3>Seu código de ativação é: <br><br> ${activation_code}</h3> <p>Link para realizar a ativação:</p> <br> <a><strong>${link}</strong></a>`)
}