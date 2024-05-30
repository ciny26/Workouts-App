import { useState } from "react";
import {useLogin} from "../hooks/useLogin"
import "./form.css"

const Login = () => {
    const[email , setEmail] = useState("")
    const[password , setPassword] = useState("")
    const {login , isLoading , err} = useLogin()
    

    const handleSignup = async(e)=>{
        e.preventDefault()
        login(email , password)
        console.log("Login")
        console.log(email , password)
    }
    return ( 
        <div className="form-cont">
            <form onSubmit={handleSignup}>
                <h3>Login</h3>
                <div className="input-group">
                    <label>email :</label>
                    <input type="email" value={email} onChange={e=>setEmail(e.target.value)} 
                    /* className={`${emptyFields.includes("title") ? "error" : ""}`} *//>
                </div>
               
                {/*adding workout reps*/ }
                <div className="input-group">
                    <label>password :</label>
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)} 
                    /* className={`${emptyFields.includes("title") ? "error" : ""}`} *//>
                </div>
                
                <button disabled = {isLoading}>Login</button>
                {err && <div className="err">
                    {err}
                </div>}
            </form>
        </div>
     );
}
export default Login;
 