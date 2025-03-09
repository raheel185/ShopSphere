import react, { useState } from "react"
import Nav from "./componenets/Nav"
import Sidebar from "./componenets/Sidebar"
import Add from "./pages/Add"
import List from "./pages/List"
import Orders from "./pages/Orders"
import Login from "./componenets/Login"
import {Routes, Route} from 'react-router-dom'

function App() {

  const [token, settoken] = useState('')

  return (
   <div className="bg-gray-50 min-h-screen">
    {
      token === '' ? <Login /> : <div>
      <Nav />
      <hr />
    <div className="flex w-full">
      <Sidebar />
      <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
            <Routes>
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
      </div>
    </div>
  </div>
    }
      
        
   </div>
  )
}

export default App
