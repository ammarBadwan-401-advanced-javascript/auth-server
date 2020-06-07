'use strict';

const express = require('express');
const router = express.Router();
// const getModel = require('./middleware/getModel');
// const user = require('./models/user-collection');
const user = require('../auth/models/user-schema');


// router.param('model',getModel);

// ***************--- The Routes ---***************


router.post('/signup', createCollection);
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


function createCollection (req,res,next){
  jaja
    .create(req.body)
    .then(result =>{
      res.status(201).json(result);
    }).catch(next);
}

module.exports = router;