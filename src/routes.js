const express = require('express');
const authMiddleware = require('./middlewares/auth');

const { UserController, SessionController, AdController } = require('./app/Controllers');

const routes = express.Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.authenticate);

routes.use(authMiddleware);

routes.get('/user/:id', UserController.show);

// ADs

routes.get('/ads', AdController.index);
routes.get('/ads/:id', AdController.show);
routes.post('/ads', AdController.store);
routes.put('/ads/:id', AdController.update);
routes.delete('/ads/:id', AdController.destroy);

module.exports = routes;
