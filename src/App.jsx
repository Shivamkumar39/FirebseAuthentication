import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Signup from './components/Signup'
import HomePage from './components/HomePage'
import Login from './components/Login'
import { auth } from './firebaseAuth'

function App() {
  const [isAuthenticted, setIsAuthenticted] = useState()

  useEffect(() =>{
    auth.onAuthStateChanged((user) =>{
      if(user){
        setIsAuthenticted(user)
        console.log('user login sessecfully');
      }else{
        setIsAuthenticted('')
      }
    })
  }, [])
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
