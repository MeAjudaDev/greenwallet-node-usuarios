const { verifyParams } = require("../validators/ValidateParams");

exports.VerifyCreateUser = async (req, res, next) => {

    const requiredParams = ["name", "email", "password"];

    const errors = verifyParams(req.body, requiredParams);

    if(!errors.length) {
      return next();
    } 

    return res.status(422).json(errors);
}