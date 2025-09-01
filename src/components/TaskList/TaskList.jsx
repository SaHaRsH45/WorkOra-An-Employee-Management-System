import React from 'react'
import AcceptTask from './AcceptTask'
import CompleteTask from './CompleteTask'
import NewTask from './NewTask'
import FailedTask from './FailedTask'

const TaskList = ({data}) => {
  return (
    <div className="h-[55vh] overflow-x-auto w-full py-6 px-6 mt-10 flex gap-8 justify-start bg-gradient-to-r from-gray-50 to-gray-100">
    {data.tasks.map((e,idx)=>{
      if(e.active){
        return <AcceptTask key={idx} data={e}/>
      }
      if(e.failed){
        return <FailedTask key={idx} data={e}/>
      }
      if(e.completed){
        return <CompleteTask key={idx} data={e}/>
      }
      if(e.newtask){
        return <NewTask key={idx} data={e}/>
      }
    })}
    </div>
  )
}

export default TaskList
