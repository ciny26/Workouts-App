import { useState } from "react";
import { useAuth } from "./useAuth";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const {dispatch } = useAuth();

  const signup = async (email, password) => {
    setIsLoading(true);
    setErr(null);

    try {
      console.log("sign up request");
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const json = await response.json();
        setErr(json.error);
        console.log("failed");
      } else {
        const json = await response.json();
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
      }
    } catch (error) {
      console.log(error);
      setErr(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, err };
};
