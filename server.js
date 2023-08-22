const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

require('dotenv').config({path:__dirname+'/.env'});
const options = {useNewUrlParser:true, useUnifiedTopology:true};
mongoose.set('strictQuery', false);
console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL, options) 

mongoose.connection.on('connected', () => {
    console.log('Mongoose connection is connected');
});

mongoose.connection.on('error', (error) => {
    console.log('Mongoose connection has occured ' + error + ' error');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection has disconnected');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose connection has disconnected due to application termination');
        process.exit();
    });
});



app.listen(3000, () => {
    console.log('server Running at localhost:3000');
});

const userRoute = require('./routes/user');
app.use(userRoute)