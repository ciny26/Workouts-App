import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import WorkoutsContextProvider from './context/WorkoutsContext.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
          <App />  
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
