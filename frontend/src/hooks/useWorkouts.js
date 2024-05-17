import { useContext } from "react";
import { workoutsContext } from "../context/WorkoutsContext";

export const useWorkouts = ()=>{
    const context = useContext(workoutsContext)

    if(!context){
        throw new Error("you can not use context API here")
    }

    return context
}