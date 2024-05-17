require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const workoutRouter = require("./routes/workouts")
//creating an express app
const app = express()



//middleware
app.use(express.json())
app.use((req , res , next)=>{
    console.log(req.path , req.method)
    console.log("motherfuckers")
    next()
})




//routes
app.use("/api/workouts" , workoutRouter)

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

