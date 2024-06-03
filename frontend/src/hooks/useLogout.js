import { useAuth } from "./useAuth";
import { useWorkouts } from "./useWorkouts";
export const useLogout = ()=>{
    const {dispatch} = useAuth()
    const {dispatch : dispatchWorkouts} = useWorkouts()
    const logout = ()=>{
        
        localStorage.removeItem("user")
        dispatch({type:"LOGOUT"})
        dispatchWorkouts({type:"SET_WORKOUTS" , payload:null})
        console.log("logout is done")
    }
    return {logout}
}