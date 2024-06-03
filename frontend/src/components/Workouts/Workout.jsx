import { useAuth } from "../../hooks/useAuth"
import { useWorkouts } from "../../hooks/useWorkouts"
import {useState} from "react"
import "./workouts.css"

const Workout = ({workout}) => {
    const {dispatch} = useWorkouts()
    const [err , setErr] = useState(false)
    const{user} = useAuth()
    const handleDeleteWorkout = async()=>{
        if(!user){
            setErr(true)
            console.log(user)
            return
        }
        const response = await fetch("api/workouts/" + workout._id , {
            method : "DELETE" , 
            headers:{
                "Authorization":`Bearer ${user.token} `,
                "Text-Content" : "application/json" , 
                
            }
        })
        if(!response.ok){
            throw new Error("cannot delete the workout")
        }
        const json = response.json()
        dispatch({type:"DELETE_WORKOUT" , payload:workout._id})
    }
    return ( 
        <div className="workout-card">
            <div className="workout-infos">
                <p><strong>Workout's Title :</strong> {workout.title}</p>
                <p><strong>Workout's Reps :</strong> {workout.reps}</p>
                <p><strong>Workout's Load :</strong> {workout.load}</p>
            </div>
            <div className="buttons">
                <button className="d-btn" onClick={handleDeleteWorkout}>delete workout</button>
                <button className="u-btn">update workout</button>
            </div>
        </div>
     );
}
 
export default Workout;
<div>

</div>