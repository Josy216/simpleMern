import React from 'react'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'

import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import HabitList from './pages/Habbitlist.jsx'

function App() {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Register />} />
      <Route path='/login' element={<Login  />} />
      <Route path='/home' element={<HabitList  />} />
      <Route path='/addHabbit' element={<Dashboard  />} />
      
      </Routes>
    </div>
  )
}

export default App
