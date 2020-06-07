'use strict';

const express = require('express');
const router = express.Router();
// const getModel = require('./middleware/getModel');
// const user = require('./models/user-collection');
const user = require('../auth/models/user-schema');
const basicAuth = require('./middleware/basic');


// router.param('model',getModel);

// ***************--- The Routes ---***************


router.post('/signup', signup);
router.post('/signin',basicAuth, signin);
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
      res.status(201).json(result);
    }).catch(next);
}

function signin(req,res,next){
  console.log(req.token);
  let answer = {}
  answer.token = req.token;
  answer.user = {username: req.theUserInfo.username,password:req.theUserInfo.password};
  res.status(200).json(answer);
}

module.exports = router;