import { BrowserRouter as Router, Routes, Route }  from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import LogInto from "../Pages/LogInto"
import Header from "../components/Header"
import Register from "../Pages/Register"
import Dashboards from "../Pages/Dashboards"


function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header/>
          <Routes>
            <Route path= '/' element = {<Dashboards/>} />
            <Route path= '/loginto' element = {<LogInto/>} />
            <Route path= '/register' element = {<Register/>} />
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  )
}

export default App
