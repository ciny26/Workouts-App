import { useState } from "react";
import { useAuth } from "./useAuth";
export const useLogin = ()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState(null);
    const {dispatch} = useAuth();
  
    const login = async (email, password) => {
      setIsLoading(true);
      setErr(null);
  
      try {
        console.log("login request");
        const response = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          const json = await response.json();
          setErr(json.error);
         
        } else {
          const json = await response.json();
          localStorage.setItem("user", JSON.stringify(json));
          dispatch({ type: "LOGIN", payload: json });
        }
      } catch (error) {
        
        setErr(error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    return { login, isLoading, err };
}