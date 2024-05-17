const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

//get a all workouts
 const getWorkouts = async(req , res)=>{
    const workouts = await Workout.find({}).sort({createdAt:-1})
    if (workouts) {
        return res.status(200).json(workouts)

    } else {
        return res.status(404).json({msg:"no workouts to show"})

    }
}


//get a single workout
const getWorkout = async(req , res)=>{
    const {id} = req.params
    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(404).json({msg:"there no such workout like this !"})

    } 
     res.status(200).json(workout)

    
}

//add a workout
 const addWorkout =  async(req , res)=>{
    const {title , reps , load} = req.body
    const emptyFields = []
    if(!title){
        emptyFields.push("title")
    }
    if(!reps){
        emptyFields.push("reps")
    }
    if(!load){
        emptyFields.push("load")
    }

    if(emptyFields.length > 0){
        return  res.status(400).json({error:"Fill all the fields" , emptyFields})
        
       
    }
    const workout = await Workout.create({title , reps , load})
    res.status(200).json(workout) 
}
   
   

//delete workout
const deleteWorkout = async(req , res)=>{
    const {id} = req.params
    try {
        await Workout.findByIdAndDelete(id)
        res.status(200).json("deleted ")

    } catch (error) {
        res.status(400).json("failed " , error)
    }

    
}

//update workout
const updateWorkout = async(req , res)=>{
    const {id} = req.params
    const {title , reps , load} = req.body
    try {
        if (mongoose.Types.ObjectId.isValid(id)) {
            await Workout.findOneAndUpdate({_id:id} , {title , reps , load})
            return res.status(200).json("added")
        }
        else{
            return res.status(400).json("bad id")
        }
       

    } catch (error) {
        res.status(400).json("failed" , error)
    }

    
}

module.exports = {
    getWorkouts , getWorkout , addWorkout , deleteWorkout , updateWorkout
}