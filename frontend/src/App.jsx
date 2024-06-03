import NavBar from "./components/NavBar"
import { useAuth } from "./hooks/useAuth"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import { Route , Routes , BrowserRouter , Navigate } from "react-router-dom"
function App() {
const {user , isLoading} = useAuth()
if(isLoading){
  return(<div>
    Loading ...
  </div>)
}
  return (
    <>
          <BrowserRouter>
            <div className="header">
              Workouts App
            </div>
            <NavBar/>
            <Routes className="content">
                <Route  path="/login" element={!user ? <Login/> : <Navigate to="/"/>}></Route>
                <Route  path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>}></Route>
                <Route  path="/" element={user ? <Home/> : <Navigate to="/login"/>}></Route>
               

            </Routes>
            
          
          </BrowserRouter>
          
    </>
  )
}

export default App
