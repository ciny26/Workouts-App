const User = require("../models/userModel")
const validator = require("validator")
const jwt = require("jsonwebtoken")

//create json web token

const createToken = (_id)=>{
    return jwt.sign({_id} , process.env.SECRET , {expiresIn : "3d"})
}
//login user

const loginUser = async(req , res)=>{
    const {email , password} = req.body
    if(!email || !password){
        return res.status(400).json({error:"You need to fill all the fields"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({error:"this email does not exists"})
    }
    const match = await User.signIn(user , password)
    if(!match){
        return res.status(400).json({error:"Incorrect password"})
    }
    try{
        const token = createToken(user._id)
        res.status(200).json({email , token})
    } catch (error) {
        res.status(400).json(error)
    }
}


const signupUser = async(req , res)=>{
    const {email , password} = req.body
    //validaton
    //1 if email and password are not null
    if(!email || !password){
        return res.status(400).json({error:"You need to fill all the fields"})
    }
    //2 if email is valid
    if (!validator.isEmail(email)) {
        return res.status(400).json({error:"Email is not valid format"})

    }
    //3 password is valid (strong)
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({error:"password must contain at least 8 caracters and one uppercase letter"})

    }



    try {
        const user = await User.signup(email , password)
        const token = createToken(user._id)
        res.status(200).json({email , token })
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    loginUser , signupUser
}