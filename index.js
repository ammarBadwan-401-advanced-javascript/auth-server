'use strict';

require('dotenv').config();
let server = require('./src/server');
let mongoose = require('mongoose');

// const URI = process.env.MONGODB_URI;
mongoose.connect('mongodb://localhost:27017/ammara',{
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

server.start();