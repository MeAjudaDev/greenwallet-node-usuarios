const express = require('express');
const routes = express.Router();

const createUsersController = require('./controllers/UsersController');

routes.post('/users', createUsersController.createUser);

module.exports = routes;