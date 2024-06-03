import { createContext, useReducer } from "react";

export const workoutsContext = createContext()
const WorkoutsContextProvider = ({children}) => {
    const workoutsReducer = (state , action)=>{
        switch (action.type) {
            case "SET_WORKOUTS":
                return { workouts: action.payload}
            case "ADD_WORKOUT":
                return {workouts : [ ...state.workouts ,  action.payload]}
            case "DELETE_WORKOUT":
                return {workouts : state.workouts.filter(workout => workout._id !== action.payload)}
            default:
                return state;
        }
    }

    const [state , dispatch] = useReducer(workoutsReducer , {
        workouts:null
    })

    return ( 
        <workoutsContext.Provider value={{...state , dispatch}}>
            {children}
        </workoutsContext.Provider>
     );
}
 
export default WorkoutsContextProvider;