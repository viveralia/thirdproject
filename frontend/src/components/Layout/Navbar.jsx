import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ButtonLink from '../Buttons/ButtonLink'
import { name } from '../../constants/meta.json'
import styled from 'styled-components'
import { FiZap } from 'react-icons/fi'
import Button from '../Buttons/Button'
import AUTH_SERVICE from '../../services/auth'

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
    text-transform: lowercase;
    color: var(--black);
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    span {
      margin-right: 0.25rem;
    }
  }
`

/*************************/
/********* JSX ***********/
/*************************/
const Navbar = () => {
  // React Hook
  const [activeUser, setUser] = useState(JSON.parse(localStorage.getItem('activeUser')))

  const logOutUser = async () => {
    await AUTH_SERVICE.logOut()
    localStorage.removeItem('activeUser')
    setUser(undefined)
  }

  return (
    <StyledNav>
      <Link to='/'>
        <span>
          <FiZap />
        </span>
        {name}
      </Link>
      {activeUser ? <Button onClick={() => logOutUser()}>Log out</Button> : <ButtonLink to='/login'>Log in</ButtonLink>}
    </StyledNav>
  )
}

export default Navbar
