const usersRepository = require('../repositories/UsersRepository');
const { encryptString } = require('./encryptionService');
const { mailProvider } = require('../provider/sendMail/SendMailProvider');
const { generateToken } = require('../utils/TokenOptions');

exports.createUser = async (name, email, password) => {

    const encryptedPassword = await encryptString(password);

    await usersRepository.create({ 
        name, 
        email, 
        password: encryptedPassword
    });

    const code = "teste";
    const token = generateToken({}, '5h');
    const link = `${process.env.USER_ACTIVATION_URL}${token}`;

    await mailProvider(email, "Ativação de Conta", `<h1>Olá ${name}!</h1> <h3>Seu código de ativação é: <br><br> ${code}</h3> <p>Link para realizar a ativação:</p> <br> <a><strong>${link}</strong></a>`)
}