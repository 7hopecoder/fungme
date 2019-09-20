const router = require('express').Router();
let User = require('../models/user.model')
const {registerValidation,loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const webToken = require('jsonwebtoken')


router.get('/', async(req,res) => {
    try{
        const users = await User.find() 
        if(users) return res.send(users)
    }catch(err){
        res.status(400).send(err);
    }    
})

router.post('/register', async(req,res)=> {
    //validation of user registration
    const {error} = registerValidation(req.body)
    if(error) return res.send({'message':error.details[0].message})

    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist) return res.send({'message':'Email already exists'})

    const salt = await bcrypt.genSalt(10);
    const hashPwd =await bcrypt.hash(req.body.password, salt)

    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashPwd,
        highscore:req.body.highscore,
    })

    try{
        const savedUser= await user.save()
        res.send({'userId': savedUser})
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/login', async(req,res)=>{
    //validation of user login
    const {error} = loginValidation(req.body)
    if(error) return res.send({'message':error.details[0].message})

    const user = await User.findOne({email:req.body.email})
    if(!user) return res.send({'message':'email not found'})

    const validPwd = await bcrypt.compare(req.body.password, user.password)
    if(!validPwd) return res.send({'message':'invalid password'})

    const token = webToken.sign({_id:user._id}, process.env.JWT_SECRET)
    res.header('auth-token',token).send({'token':token})

})


module.exports = router