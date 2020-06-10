'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./auth/middleware/bearer-auth');
const permissions = require('./auth/middleware/authorize');


router.get('/secret', bearerMiddleware,permissions('read'),secret);
router.get('/read',bearerMiddleware,permissions('read'), read );
router.get('/add',bearerMiddleware,permissions('create'), add );
router.get('/change',bearerMiddleware,permissions('update'), change );
router.get('/remove',bearerMiddleware,permissions('delete'), remove );


function read(req,res,next){
  res.status(200).send('Read route!');
}

function add(req,res,next){
  res.status(200).send('Create Route!');
}

function change(req,res,next){
  res.status(200).send('Update route!');
}

function remove(req,res,next){
  res.status(200).send('Delete route!');
}

function secret(req,res,next){
  res.status(200).json(req.user);
}


module.exports = router;