import NavBar from "./components/NavBar"
import Home from "./Pages/Home"
import { Route , Routes , BrowserRouter } from "react-router-dom"
function App() {

  return (
    <>
          <BrowserRouter>
            <div className="header">
              Workouts App
            </div>
            <NavBar/>
            <Routes className="content">
                <Route index path="/" element={<Home/>}></Route>
            </Routes>
            
          
          </BrowserRouter>
          
    </>
  )
}

export default App
