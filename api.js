const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./app/models/user');
const auth = require('./app/middlewares/auth');

const apiRouter = express.Router();


apiRouter.post('/authenticate', (req,res) => {
    User.findOne({
        name: req.body.name
    }, (err,user) => {
        if (err) throw err;
        if (!user) res.json({message: 'User not valid!'});
        else if (user){
            if (user.password != req.body.password){
                res.json({message: 'Password not valid!'});
            } else{
                const token = jwt.sign({user}, req.app.get('superSecret'));
                res.json({
                    token
                });
            }
        }

    });
});

apiRouter.get('/', (req,res) => {
    res.json({
        message: 'Welcome to my API'
    });
});

apiRouter.get('/users', auth, (req,res) => {
    User.find({}, (err,users) => {
        if (err) throw err;
        res.json({users});
    })
});



module.exports = apiRouter;
