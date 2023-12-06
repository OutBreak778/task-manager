"use client"

import React from 'react'
import { useGlobalState } from '../context/GlobalProvider'
import Tasks from '../components/Tasks/Tasks'

const page = () => {

  const { ImportantTask } = useGlobalState()

  return (
    <div className='w-full h-full'>
      <Tasks tasks={ImportantTask} title='Important Task' />
    </div>
  )
}

export default page