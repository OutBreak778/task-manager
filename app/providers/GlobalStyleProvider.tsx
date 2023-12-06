"use client"

import React from "react"
import styled from "styled-components"

interface Props {
    children: React.ReactNode
}

const GlobalStyleProvider = ({children}: Props) => {
    return(
        <GlobalStyle className="flex p-8 gap-10 h-[100%] ">{children}</GlobalStyle>
    )
}

export default GlobalStyleProvider

const GlobalStyle = styled.div`

transition: all 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
    .gridTask {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 1.2rem;
    }
`