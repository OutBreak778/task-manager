"use client"

import { SignIn } from '@clerk/nextjs'
import React from 'react'
import styled from 'styled-components'

const page = () => {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'><SignIn /></div>
  )
}

export default page
