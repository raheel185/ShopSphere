import react, { useEffect, useState } from "react"
import Nav from "./componenets/Nav"
import Sidebar from "./componenets/Sidebar"
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import Login from "./componenets/Login"
import {Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {

  const [token, settoken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  useEffect(()=>{

    localStorage.setItem('token',token)

  },[token])

  return (
   <div className="bg-gray-50 min-h-screen">
    <ToastContainer />
    {
      token === '' ? <Login settoken={settoken} /> : <div>
      <Nav settoken={settoken} />
      <hr />
    <div className="flex w-full">
      <Sidebar />
      <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
            <Routes>
              <Route path="/add" element={<Add settoken={settoken} />} />
              <Route path="/list" element={<List settoken={settoken} />} />
              <Route path="/orders" element={<Orders settoken={settoken} />} />
            </Routes>
      </div>
    </div>
  </div>
    }
      
        
   </div>
  )
}

export default App
