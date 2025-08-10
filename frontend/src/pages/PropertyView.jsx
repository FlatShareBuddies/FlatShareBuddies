import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const formatCurrency = (num) => `₹${Number(num).toLocaleString('en-IN')}`

export default function PropertyView(){
  const { id } = useParams()
  const [p, setP] = useState(null)
  useEffect(()=>{ fetch() },[])
  async function fetch(){
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + '/properties/' + id)
      setP(res.data)
    } catch (err) { console.error(err) }
  }
  if(!p) return <div>Loading...</div>
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">{p.title}</h2>
      <div className="text-gray-600">{p.city}, {p.state} — {p.pincode}</div>
      <div className="mt-4">{p.images?.map((img,i)=> <img key={i} src={img} className="w-full mb-2" alt="prop" />)}</div>
      <div className="mt-2 text-lg">{formatCurrency(p.rent)} <span className="text-sm text-gray-500">+ {formatCurrency(p.maintenance)} maintenance</span></div>
      <p className="mt-3">{p.description}</p>
      <div className="mt-4">
        <div className="text-xs text-gray-500">Contact</div>
        <div className="font-medium">{p.owner?.name} • {p.owner?.phone || 'Hidden'}</div>
      </div>
      <div className="mt-3 text-sm text-gray-600">
        <div>BHK: {p.bhk} · Occupancy: {p.occupancy} · Tenant type: {p.tenantType}</div>
        <div>Veg preference: {p.vegPreference} · Preferred gender: {p.preferredGender}</div>
      </div>
    </div>
  )
}
