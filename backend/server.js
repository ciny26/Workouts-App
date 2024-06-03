require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const workoutRouter = require("./routes/workouts")
const userRouter = require("./routes/user")



//creating an express app
const app = express()
app.use(express.json());



//middleware
app.use((req , res , next)=>{
    console.log(req.path , req.method)
    next()
})




//routes
app.use("/api/workouts" , workoutRouter)
app.use("/api" , userRouter)
mongoose.connect(process.env.MONG_URI)
.then(()=>{
    //listening after connetcing to the database
    app.listen(process.env.PORT , ()=>{
        console.log("connceting to db & listening to port" , process.env.PORT)
    })
})
.catch((error)=>{
    console.log("cannot connect to db " , error)
})

