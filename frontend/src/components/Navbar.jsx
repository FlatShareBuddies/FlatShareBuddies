import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Navbar(){
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/'); }
  return (
    <nav className="bg-white shadow-sm mb-4">
      <div className="container p-4 flex justify-between items-center">
        <Link to="/" className="font-semibold text-xl">MERN Rentals (India)</Link>
        <div className="flex gap-3 items-center">
          <Link to="/post" className="px-3 py-2 bg-blue-600 text-white rounded">Post Property</Link>
          {!token ? (
            <>
              <Link to="/login" className="px-3 py-2">Login</Link>
              <Link to="/signup" className="px-3 py-2">Signup</Link>
            </>
          ) : (
            <button onClick={logout} className="px-3 py-2">Logout</button>
          )}
        </div>
      </div>
    </nav>
  )
}
