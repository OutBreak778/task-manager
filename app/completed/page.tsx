"use client"

import React from 'react'
import { useGlobalState } from '../context/GlobalProvider'
import Tasks from '../components/Tasks/Tasks'

const page = () => {

  const {CompletedTask} = useGlobalState()
  return (
    <div className='w-full h-full'>
      <Tasks tasks={CompletedTask} title='Completed Task' />
    </div>
  )
}

export default page