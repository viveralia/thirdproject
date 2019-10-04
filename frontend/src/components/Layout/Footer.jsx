import React from 'react'
import styled from 'styled-components'
import { name } from '../../constants/meta.json'
import { FiHeart } from 'react-icons/fi'

/*************************/
/********* CSS ***********/
/*************************/
const StyledFooter = styled.footer`
  text-align: center;
  padding: 1rem 1.5rem;
  border-top: var(--border);
  margin-top: auto;
  span {
    font-size: 85%;
  }
`

/*************************/
/********* JSX ***********/
/*************************/
const Footer = () => {
  return (
    <StyledFooter>
      <small>
        &copy; {`${name} ${new Date().getFullYear()}`} - Made with{' '}
        <span>
          <FiHeart />
        </span>
      </small>
    </StyledFooter>
  )
}

export default Footer
