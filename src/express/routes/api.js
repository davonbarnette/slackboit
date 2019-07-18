const express = require('express');

const api = express.Router();

api.get('/ping', (req, res)=>{
    res.status(200).send({success:true});
});

module.exports = api;
