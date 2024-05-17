import { useEffect , useState } from "react";
import Workout from "./Workout";
import "./workouts.css"
import { useWorkouts } from "../../hooks/useWorkouts";
const Workouts = () => {

    const {workouts , dispatch} = useWorkouts()
    const [Err , setErr] = useState(false)

    useEffect(() => {
        const getWorkouts = async () => {
            try {
                const response = await fetch("api/workouts");
                
                if(response.ok){
                    const json = await response.json();
                    setErr(false)
                    dispatch({type:"GET_WORKOUTS" , payload:json})
                }
                else{
                        setErr(true)
                }
                
            } catch (error) {
                console.error("Error fetching workouts:", error);
            }
        };

        getWorkouts();
    }, []);

    return (
        <div className="container">
            <h1>Workouts List</h1>
            {workouts && workouts.map((workout)=>(
                <Workout key={workout._id} workout={workout}/>
            ))}
        </div>
    );
};

export default Workouts;
