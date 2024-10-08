const express = require('express');
const app =  express();
const userRouter = require('./routes/user');
const color = require('colors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connecDB = require('./config/db')

 
// Load env
dotenv.config({path: './config/config.env'});

// DB
connecDB();


//jSON
app.use(express.json());

// Mount routes
app.use('/movies/api/user', userRouter);

const PORT = process.env.PORT || 8000 ;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`.yellow.underline);
})