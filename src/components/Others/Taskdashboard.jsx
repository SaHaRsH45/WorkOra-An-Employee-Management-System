import React from 'react'

const Taskdashboard = ({ data }) => {
  const cardStyles = "flex-1 rounded-xl py-6 px-6 shadow-xl text-white flex flex-col justify-center items-center transition-transform duration-300 hover:-translate-y-1 hover:scale-105";

  return (
    <div className='flex gap-6 mt-10'>
      <div className={`${cardStyles} bg-gradient-to-r from-red-500 to-red-400`}>
        <h2 className='text-3xl font-bold'>{data.taskNumbers.newtask}</h2>
        <h3 className='text-xl font-semibold mt-2'>New Tasks</h3>
      </div>

      <div className={`${cardStyles} bg-gradient-to-r from-blue-500 to-blue-400`}>
        <h2 className='text-3xl font-bold'>{data.taskNumbers.completed}</h2>
        <h3 className='text-xl font-semibold mt-2'>Completed</h3>
      </div>

      <div className={`${cardStyles} bg-gradient-to-r from-yellow-400 to-yellow-300`}>
        <h2 className='text-3xl font-bold'>{data.taskNumbers.active}</h2>
        <h3 className='text-xl font-semibold mt-2'>Accepted</h3>
      </div>

      <div className={`${cardStyles} bg-gradient-to-r from-green-500 to-green-400`}>
        <h2 className='text-3xl font-bold'>{data.taskNumbers.failed}</h2>
        <h3 className='text-xl font-semibold mt-2'>Failed</h3>
      </div>
    </div>
  )
}

export default Taskdashboard
