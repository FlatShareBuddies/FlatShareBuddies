import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PostProperty from './pages/PostProperty'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PropertyView from './pages/PropertyView'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container">
        <Routes>
          <Route index element={<Home/>} />
          <Route path="post" element={<PostProperty/>} />
          <Route path="login" element={<Login/>} />
          <Route path="signup" element={<Signup/>} />
          <Route path="property/:id" element={<PropertyView/>} />
        </Routes>
      </div>
    </div>
  )
}
