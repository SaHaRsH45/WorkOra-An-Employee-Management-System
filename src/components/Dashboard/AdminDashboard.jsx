import React from 'react'
import Header from '../Others/Header'
import CreateTask from '../Others/CreateTask' 

const AdminDashboard = (props) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <Header changeUser={props.changeUser} />

      {/* Shifted form left without shrinking */}
      <div className="mt-0">
        <CreateTask />
      </div>
      
    </div>
  )
}

export default AdminDashboard
