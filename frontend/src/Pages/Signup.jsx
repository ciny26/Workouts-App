import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import "./form.css"
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, err } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(email, password);
    
    
  };

  return (
    <div className="form-cont">
      <form onSubmit={handleSignup}>
        <h3>Signup</h3>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button disabled={isLoading}>Signup</button>
        {err && <div className="err">{err}</div>}
      </form>
    </div>
  );
};

export default Signup;
