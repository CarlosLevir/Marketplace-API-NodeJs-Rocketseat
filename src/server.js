const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes');
const database = require('./config/database')

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== 'production';

    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    mongoose.connect(database.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
    });
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;
