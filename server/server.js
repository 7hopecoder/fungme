"use strict";
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology: true});

//DB connection
const connection=mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

//Import routes
const userRouter = require('./routes/auth')

//Middleware routes
app.use('/users', userRouter)

app.listen(port,() => {
    console.log(`Server is running on port: ${port}`)
})



