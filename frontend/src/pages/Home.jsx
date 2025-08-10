import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PropertyCard from '../components/PropertyCard'

export default function Home(){
  const [props, setProps] = useState([])
  const [stateQ, setStateQ] = useState('')
  const [city, setCity] = useState('')
  useEffect(()=>{ fetchList() },[])
  async function fetchList(){
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + '/properties', { params: { state: stateQ, city } })
      setProps(res.data)
    } catch (err) { console.error(err); }
  }
  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input value={stateQ} onChange={e=>setStateQ(e.target.value)} placeholder="State" className="border p-2 rounded" />
        <input value={city} onChange={e=>setCity(e.target.value)} placeholder="City" className="border p-2 rounded" />
        <button onClick={fetchList} className="px-3 py-2 bg-blue-600 text-white rounded">Search</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {props.map(p=> <PropertyCard key={p._id} p={p} />)}
      </div>
    </div>
  )
}
