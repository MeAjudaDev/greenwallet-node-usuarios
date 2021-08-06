const express = require('express');
const routes = express.Router();

const createUsersController = require('./controllers/UsersController');
const userValidationMiddlewares = require('./middlewares/UserValidationMiddlewares')

routes.post('/users', userValidationMiddlewares.VerifyCreateUser, createUsersController.createUser);

module.exports = routes;