const express = require("express");
const router = express.Router();
const {
    getWorkouts,
    getWorkout,
    addWorkout,
    deleteWorkout,
    updateWorkout,
} = require("../controllers/workoutControllers");

// Get all workouts
router.get("/", getWorkouts);

// Get a single workout
router.get("/:id", getWorkout);

// Post a workout
router.post("/", addWorkout);

// Delete workout
router.delete("/:id", deleteWorkout);

// Update workout
router.patch("/:id", updateWorkout);

module.exports = router;
