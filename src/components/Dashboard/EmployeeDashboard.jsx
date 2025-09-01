import React from 'react'
import Header from '../Others/Header'
import Taskdashboard from '../Others/Taskdashboard'
import TaskList from '../TaskList/TaskList'
const EmployeeDashboard = ({changeUser,data}) => {
  return (
    <div>
      <h1></h1>
      <Header changeUser={changeUser} data={data}/>
      <Taskdashboard data={data}/>
      <TaskList data={data}/>
    </div>
  )
}

export default EmployeeDashboard
