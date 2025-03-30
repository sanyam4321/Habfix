import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import AboutUs from './pages/Home/AboutUs'
import Contact from './pages/Home/Contact'
import NotFound from './pages/NotFound'
import SignUp from './pages/Login/Signup'
import Login from './pages/Login/Login'
import StudentDash from './pages/Student/StudentDash'
import TechnicianDash from './pages/Technician/TechnicianDash'
import HostelAdminDash from './pages/HostelAdmin/HostelAdminDash'
import CollegeAdminDash from './pages/CollegeAdmin/CollegeAdminDash'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/student' element={<StudentDash />}></Route>
        <Route path='/technician' element={<TechnicianDash />}></Route>
        <Route path='/hosteladmin' element={<HostelAdminDash />}></Route>
        <Route path='/collegeadmin' element={<CollegeAdminDash />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
