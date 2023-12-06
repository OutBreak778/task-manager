"use client"

import React from 'react'
import { useGlobalState } from '../context/GlobalProvider'
import Tasks from '../components/Tasks/Tasks'

const page = () => {

  const { IncompleteTask } = useGlobalState()

  return (
    <div className='w-full h-full'>
      <Tasks tasks={IncompleteTask} title='Incompleted Task' />
    </div>
  )
}

export default page