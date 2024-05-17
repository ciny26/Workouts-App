import { useState } from "react";
import "./AddForm.css"
import { useWorkouts } from "../../hooks/useWorkouts";
const AddWorkout = () => {
    const[wTitle , setWTitle] = useState("")
    const[wReps , setWReps] = useState(null)
    const[wLoad , setWLoad] = useState(null)
    const [emptyFields , setEmptyFields] = useState([])
    const [err , setErr] = useState("")
    const {dispatch} = useWorkouts()

    const handleSubmit = async(e)=>{
        e.preventDefault()
       try {
            const response = await fetch("/api/workouts" , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: wTitle,  // Assuming wTitle is your state holding the workout title
                    reps: wReps,    // Assuming wReps is your state holding the workout reps
                    load: wLoad     // Assuming wLoad is your state holding the workout load
                }),
            });
            

            const data = await response.json();
            if (!response.ok) {
                setErr(data.error);
                setEmptyFields(data.emptyFields || []);
            } else {
                dispatch({ type: "ADD_WORKOUT", payload: data });
                setWTitle('');
                setWReps('');
                setWLoad('');
                setErr("");
                setEmptyFields([]);
            }
            console.log(data);  // Log the response from the server
           
       } catch (error) {
        
        console.error("something went wrong" , error)
       }
    }
    return ( 
        <div className="form-cont">
            <form onSubmit={handleSubmit}>
                <h3>Add a workout</h3>
                {/*adding workout title*/ }
                <div className="input-groupe">
                    <label>Enter workout's title :</label>
                    <input type="text" value={wTitle} onChange={e=>setWTitle(e.target.value)} 
                    className={`${emptyFields.includes("title") ? "error" : ""}`}/>
                </div>
               
                {/*adding workout reps*/ }
                <div className="input-groupe">
                    <label>Enter workout's Reps :</label>
                    <input type="text" value={wReps || ""} onChange={e=>setWReps(e.target.value)} 
                    className={`${emptyFields.includes("reps") ? "error" : ""}`}/>
                </div>
                
                {/*adding workout load*/ }
                
                <div className="input-groupe">
                    <label>Enter workout's Load :</label>
                    <input type="text" value={wLoad || ""} onChange={e=>setWLoad(e.target.value)}
                    className={`${emptyFields.includes("load") ? "error" : ""}`} />
                </div>
                
                <button>Add Workout</button>
                {err && <div className="err">
                    {err } 
                </div>}
            </form>
        </div>
     );
}
 
export default AddWorkout;