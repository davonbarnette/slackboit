const express = require('express');
const path = require('path');
const base = express.Router();

base.get('', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', '..', '/assets/templates/home/index.html'))
});

module.exports = base;
