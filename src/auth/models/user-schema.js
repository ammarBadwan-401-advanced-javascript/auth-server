'use strict';

const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const SECRET = process.env.SECRET;

const users = mongoose.Schema({
  username: { type : String , unique : true, required : true ,index: true},
  password:{type:String,require:true},
});

users.pre('save',async function(){
  this.password = await bcrypt.hash(this.password,5);
});

module.exports = mongoose.model('users',users);