import React from 'react'
import { Link } from 'react-router-dom'
const formatCurrency = (num) => `₹${Number(num).toLocaleString('en-IN')}`
export default function PropertyCard({p}){
  return (
    <div className="border rounded shadow-sm overflow-hidden">
      {p.images?.[0] && <img src={p.images[0]} className="w-full h-48 object-cover" alt="prop" />}
      <div className="p-3">
        <h3 className="font-semibold">{p.title} — {formatCurrency(p.rent)}</h3>
        <p className="text-sm text-gray-600">{p.bhk} BHK · {p.occupancy} · {p.city}</p>
        <p className="mt-2 text-sm">{p.description?.slice(0,120)}...</p>
        <div className="mt-3">
          <div className="text-xs text-gray-500">Contact:</div>
          <div className="font-medium">{p.owner?.name} • {p.owner?.phone || 'Hidden'}</div>
        </div>
        <div className="mt-3">
          <Link to={'/property/'+p._id} className="text-sm text-blue-600">View details</Link>
        </div>
      </div>
    </div>
  )
}
