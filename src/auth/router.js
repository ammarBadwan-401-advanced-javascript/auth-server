'use strict';

const express = require('express');
const router = express.Router();
// const getModel = require('./middleware/getModel');
// const user = require('./models/user-collection');
const user = require('../auth/models/user-schema');
const basicAuth = require('./middleware/basic');
const OAuthMiddleware = require('./middleware/oauth');


// router.param('model',getModel);

// ***************--- The Routes ---***************


router.post('/signup', signup);
router.post('/signin',basicAuth, signin);
router.get('/users',getUsers);
router.get('/oauth',OAuthMiddleware,oAuth);
// router.get('/',mainPage);
// router.post('/signin', createCollection);


// ***************--- The Functions ---***************

// function getCollection(req,res,next){
//   let idCheck;
//   req.model
//     .read(idCheck)
//     .then(result=>{
//       res.status(403).json(result);
//     })
//     .catch(next);
// }


function signup (req,res,next){
  user
    .create(req.body)
    .then(result =>{
      let answer = {};
      answer.token = user.generateToken(result);
      answer.user = {username:result.username, password:result.password};
      res.status(201).json(answer);
    }).catch(next);
}

function signin(req,res,next){
  console.log(req.token);
  res.cookie('token',req.token);
  let answer = {};
  answer.token = req.token;
  answer.user = {username: req.theUserInfo.username,password:req.theUserInfo.password};
  res.status(200).json(answer);
}

function getUsers(req,res,next){
  user.find({})
    .then(result=>{
      res.status(200).json(result);
    }).catch(next);
}

function oAuth(req,res,next){
  res.status(200).send(req.token);
}

module.exports = router;