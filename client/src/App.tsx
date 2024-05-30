import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
