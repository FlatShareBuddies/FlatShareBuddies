import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup(){
  const [form, setForm] = useState({ name:'', email:'', password:'', phone:'', role:'landlord' })
  const navigate = useNavigate()
  async function submit(e){
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/auth/register', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/')
    } catch (err) { console.error(err); alert('Signup failed') }
  }
  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Signup</h2>
      <input className="w-full p-2 border mb-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
      <input className="w-full p-2 border mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
      <input className="w-full p-2 border mb-2" placeholder="Phone (+91...)" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
      <input type="password" className="w-full p-2 border mb-2" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
      <div className="mb-2">
        <label className="text-sm">Role</label>
        <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="p-2 border w-full">
          <option value="landlord">Landlord</option>
          <option value="tenant">Tenant</option>
        </select>
      </div>
      <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">Signup</button>
    </form>
  )
}
