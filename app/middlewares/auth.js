const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const express = require('express');


function isAuth (req,res,next){
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token){
        jwt.verify(token,req.app.get('superSecret'), (err, decoded) => {
            if (err){
                res.json({message: 'Auth Failed'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403).send({mesage: 'You don`t have a token'})
    }
};

module.exports = isAuth;