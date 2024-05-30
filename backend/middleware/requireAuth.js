const jwt = require("jsonwebtoken")
const env = require("dotenv")
const User = require("../models/userModel")
const requireAuth = async(req , res , next)=>{
    //verify authentification
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error : "Authoriztion token is required"})
    }
    //get the token 
    const token = authorization.split(" ")[1]

    try {
        
         const {_id} = jwt.verify(token , process.env.SECRET)
         
         req.user = await User.findOne({_id}).select("_id")
         next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({error : "request is not authorized"})

    }
}

module.exports = requireAuth