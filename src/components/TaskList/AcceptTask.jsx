import React from 'react'

const AcceptTask = ({ data }) => {
  return (
    <div className="h-full w-[320px] flex-shrink-0 rounded-2xl p-5 shadow-xl border border-gray-200 bg-gradient-to-br from-yellow-400 to-yellow-300 hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
      
      {/* Category + Date */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="bg-yellow-600 text-white rounded-lg px-3 py-1 text-xs font-semibold shadow-sm">
          {data.category}
        </h3>
        <h4 className="text-sm font-medium text-gray-100">{data.date}</h4>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-white mb-3">{data.title}</h2>

      {/* Description */}
      <p className="text-sm leading-relaxed text-white mb-4">{data.description}</p>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 px-3 py-2 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 shadow-md transition">
          Mark as Completed
        </button>
        <button className="flex-1 px-3 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 shadow-md transition">
          Mark as Failed
        </button>
      </div>
    </div>
  )
}

export default AcceptTask
