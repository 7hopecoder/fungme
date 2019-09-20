const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:5
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
    highscore:{
        type:Number,        
        required:true
    },
},{
    timestamps:true,
}) 

const User = mongoose.model('User',userSchema)
module.exports = User