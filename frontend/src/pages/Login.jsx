import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' })
  const navigate = useNavigate()
  async function submit(e){
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/')
    } catch (err) { console.error(err); alert('Login failed') }
  }
  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Login</h2>
      <input className="w-full p-2 border mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
      <input type="password" className="w-full p-2 border mb-2" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
      <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Login</button>
    </form>
  )
}
