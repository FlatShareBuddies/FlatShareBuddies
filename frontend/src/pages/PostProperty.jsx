import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const STATES = ['Maharashtra','Karnataka','Tamil Nadu','Delhi','Kerala','Telangana','West Bengal','Gujarat','Rajasthan','Punjab','Other']

export default function PostProperty(){
  const [form, setForm] = useState({ title:'', description:'', rent:'', maintenance:0, bhk:1, occupancy:'single', tenantType:'any', vegPreference:'any', preferredGender:'any', city:'', state:'', pincode:'', address:'' })
  const [files, setFiles] = useState([])
  const navigate = useNavigate()
  async function submit(e){
    e.preventDefault();
    try {
      const token = localStorage.getItem('token')
      const fd = new FormData();
      Object.entries(form).forEach(([k,v])=> fd.append(k,v))
      files.forEach(f=> fd.append('images', f))
      await axios.post(import.meta.env.VITE_API_URL + '/properties', fd, { headers: { 'Content-Type':'multipart/form-data', Authorization: 'Bearer '+token } })
      alert('Posted')
      navigate('/')
    } catch (err) { console.error(err); alert('Error posting') }
  }
  return (
    <form onSubmit={submit} className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Post Property</h2>
      <input className="w-full p-2 border mb-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
      <textarea className="w-full p-2 border mb-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required />
      <div className="grid grid-cols-2 gap-2">
        <input className="p-2 border mb-2" placeholder="Rent (monthly)" value={form.rent} onChange={e=>setForm({...form,rent:e.target.value})} required />
        <input className="p-2 border mb-2" placeholder="Maintenance (monthly)" value={form.maintenance} onChange={e=>setForm({...form,maintenance:e.target.value})} />
      </div>
      <input className="w-full p-2 border mb-2" placeholder="City" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} required />
      <div className="grid grid-cols-2 gap-2">
        <select value={form.state} onChange={e=>setForm({...form,state:e.target.value})} className="p-2 border">
          <option value="">Select State</option>
          {STATES.map(s=> <option key={s} value={s}>{s}</option>)}
        </select>
        <input className="p-2 border" placeholder="Pincode" value={form.pincode} onChange={e=>setForm({...form,pincode:e.target.value})} />
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        <select value={form.bhk} onChange={e=>setForm({...form,bhk:e.target.value})} className="p-2 border">
          <option value={1}>1 BHK</option>
          <option value={2}>2 BHK</option>
          <option value={3}>3 BHK</option>
        </select>
        <select value={form.occupancy} onChange={e=>setForm({...form,occupancy:e.target.value})} className="p-2 border">
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="triple">Triple</option>
        </select>
        <select value={form.tenantType} onChange={e=>setForm({...form,tenantType:e.target.value})} className="p-2 border">
          <option value="any">Any</option>
          <option value="bachelor">Bachelor</option>
          <option value="family">Family</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <select value={form.vegPreference} onChange={e=>setForm({...form,vegPreference:e.target.value})} className="p-2 border">
          <option value="any">Any</option>
          <option value="veg">Veg only</option>
          <option value="nonveg">Non-veg allowed</option>
        </select>
        <select value={form.preferredGender} onChange={e=>setForm({...form,preferredGender:e.target.value})} className="p-2 border">
          <option value="any">Any gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="mb-2 mt-2">
        <label className="block text-sm">Images</label>
        <input type="file" multiple accept="image/*" onChange={e=>setFiles(Array.from(e.target.files))} />
        <div className="text-xs text-gray-500 mt-1">Images are saved locally to the backend/uploads folder (placeholder). We'll add Cloudinary later.</div>
      </div>
      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Post</button>
    </form>
  )
}
