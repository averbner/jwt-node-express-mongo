const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const User = require('./app/models/user');
const apiRoutes = require('./api');



const app = express();

//settings
const port = process.env.PORT || 3000;
mongoose.connect(config.database, {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

app.set('superSecret', config.secret);

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//routes
app.get('/', (req,res) =>{
    res.send('Hello, the API at localhost:3000/api');
});

app.get('/setup', (req,res) => {
    const testUser = new User({
        name: 'Ariel',
        password: '123456',
        admin: true
    });
    testUser.save((err) => {
        if (err) throw err;
        console.log('User saved on database');
        res.json({
            success: true,
            data: testUser
        });
    });

});

app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log('Server on port ' + port);
})