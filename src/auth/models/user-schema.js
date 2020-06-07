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

users.statics.authenticateBasic = async function(username,password){
  let theUser = await this.find({username:username});
  let valid = await bcrypt.compare(password,theUser[0].password);
  return valid ? theUser : Promise.reject();
};

users.statics.generateToken = function(user){
  let token = jwt.sign({username: user.username},SECRET);
  return token;
};

module.exports = mongoose.model('users',users);