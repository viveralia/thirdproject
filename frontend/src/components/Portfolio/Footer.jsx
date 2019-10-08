import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import meta from '../../constants/meta.json'

/*************************/
/********* CSS ***********/
/*************************/
const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

/*************************/
/********* JSX ***********/
/*************************/
const Footer = ({ name }) => {
  return (
    <StyledFooter>
      <div>
        <small>
          &copy; {name} {new Date().getFullYear()}
        </small>
      </div>
      <div>
        <small>
          <Link to='/'>Made with {meta.name}</Link>
        </small>
      </div>
    </StyledFooter>
  )
}

export default Footer
