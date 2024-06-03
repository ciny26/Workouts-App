import { createContext, useEffect, useReducer , useState } from "react";


export const AuthContext = createContext()

const authReducer = (state , action)=>{
    switch (action.type) {
        case "LOGIN":
            return {user : action.payload}
        case "LOGOUT":
                return {user : null}
        default:
            state;
    }
}
const AuthContextProvider = ({children}) => {
    const [state , dispatch] = useReducer(authReducer , {
        user:null
    })
    const [isLoading , setIsLoading] = useState(true)
    console.log("Auth state" , state)

    useEffect(()=>{
        setTimeout(() => {
            const user = JSON.parse(localStorage.getItem("user"))
            if(user){
                dispatch({type : "LOGIN" , payload : user})
            }
            setIsLoading(false) 
        }, 1000);
        

        
    } , [])
    return ( 
        
        <AuthContext.Provider value={{...state , dispatch , isLoading}}>
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;