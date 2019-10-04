import React from 'react'
import { Link } from 'react-router-dom'
import ButtonLink from '../Buttons/ButtonLink'
import { name } from '../../constants/meta.json'
import styled from 'styled-components'

/*************************/
/********* CSS ***********/
/*************************/
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  a:first-child {
    font-weight: 500;
    color: var(--black);
    font-size: 1.25rem;
  }
`

/*************************/
/********* JSX ***********/
/*************************/
const Navbar = () => {
  return (
    <StyledNav>
      <Link to='/'>{name}</Link>
      <ButtonLink to='/login'>Log in</ButtonLink>
    </StyledNav>
  )
}

export default Navbar
