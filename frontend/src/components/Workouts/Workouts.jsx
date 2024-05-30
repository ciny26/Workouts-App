import { useEffect , useState } from "react";
import Workout from "./Workout";
import "./workouts.css"
import { useWorkouts } from "../../hooks/useWorkouts";
import { useAuth } from "../../hooks/useAuth";
const Workouts = () => {

    const {workouts , dispatch} = useWorkouts()
    const {user} = useAuth()
    const [err , setErr] = useState(false)

    useEffect(() => {
        const getWorkouts = async () => {
            if(!user){
                setErr(true)
                console.log(user)
                return
            }
            try {
                const response = await fetch("api/workouts" , {
                    headers:{
                        "authorization":`Bearer ${user.token} `
                    }
                }
                    
                );
                
                if(response.ok){
                    const json = await response.json();
                    setErr(false)
                    dispatch({type:"SET_WORKOUTS" , payload:json})
                }
                else{
                        setErr(true)
                }
                
            } catch (error) {
                console.error("Error fetching workouts:", error);
            }
        };

        getWorkouts();
    }, [user , dispatch]);

    return (
        <div className="container">
            <h1>Workouts List</h1>
            {err && <div className="error"> You must login first
                    </div>}
            {workouts && workouts.map((workout)=>(
                <Workout key={workout._id} workout={workout}/>
            ))}
        </div>
    );
};

export default Workouts;
