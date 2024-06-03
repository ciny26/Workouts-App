import {Link} from "react-router-dom"
import { useLogout } from "../hooks/useLogout";
import { useAuth } from "../hooks/useAuth";

const NavBar = () => {
    const {logout} = useLogout()
    const {user} = useAuth()
    const handleLogout = ()=>{
        logout()
    }
    return ( 
        <nav>
            <div className="">
                {user && <>
                    <span>{user.email}</span>
                    <Link to="/">Home</Link>
                    <div>
                         <button onClick={handleLogout} >Log out</button>
                     </div>
                </>}
                {!user && <>
                    <Link to="/signup">Signup</Link>
                    <Link to="/login">Login</Link>
                </>}
                
            </div>
            
        </nav>
     );
}
 
export default NavBar;