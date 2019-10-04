import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import './layout.css'
import styled from 'styled-components'

/*************************/
/********* CSS ***********/
/*************************/
const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

/*************************/
/********* JSX ***********/
/*************************/
const Layout = ({ children }) => {
  return (
    <StyledLayout>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </StyledLayout>
  )
}

export default Layout
