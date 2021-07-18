const express = require('express');
const routes = express.Router();

const createUsersController = require('./useCases/createUsers/CreateUsersController');

routes.post('/users', createUsersController.handle);

module.exports = routes;