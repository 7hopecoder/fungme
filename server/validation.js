const Joi = require('@hapi/joi')

const registerValidation = (data) =>{
    console.log(data)
    const schema = Joi.object({
            username: Joi.string()
                         .min(6)
                         .required(),
            email: Joi.string()
                      .min(6)
                      .required()
                      .email(),
            password: Joi.string()
                        .min(6)
                        .required(),
            confirmpassword:Joi.ref('password'),
            highscore:Joi.number()
                         .min(0)
                         .required()
                         .allow()  
    
        })
    
    return schema.validate(data)
    
}

const loginValidation = (data) =>{
    console.log(data)
    const schema = Joi.object({        
        email:Joi.string()
                .min(6)
                .required()
                .email(),
        password:Joi.string()
                    .min(6)
                    .required()

    })
    return schema.validate(data)
}

module.exports.registerValidation =registerValidation;
module.exports.loginValidation =loginValidation;
