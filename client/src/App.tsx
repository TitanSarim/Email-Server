import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashbaord/Dashboard'
import {ProtectedRoutes} from './components/ProtectedRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>

          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
