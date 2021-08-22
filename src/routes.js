const express = require("express");
const routes = express.Router();

const usersController = require("./controllers/UsersController");
const userValidationMiddlewares = require("./middlewares/UserValidationMiddlewares");

routes.post(
  "/users",
  userValidationMiddlewares.VerifyCreateUser,
  usersController.createUser
);
routes.post("/users/activation", usersController.activationAccount);
routes.post("/users/login", usersController.login);
routes.post("/users/recoverPassword");
module.exports = routes;
