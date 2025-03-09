import react from "react"
import Nav from "./componenets/Nav"
import Sidebar from "./componenets/Sidebar"

function App() {
  return (
   <div className="bg-gray-50 min-h-screen">
      <div>
          <Nav />
          <hr />
        <div className="flex w-full">
          <Sidebar />
        </div>
      </div>
        
   </div>
  )
}

export default App
