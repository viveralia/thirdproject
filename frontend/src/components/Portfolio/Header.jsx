import React from 'react'
import styled from 'styled-components'

/*************************/
/********* CSS ***********/
/*************************/
const StyledHeader = styled.header`
  text-align: center;
  padding: 2rem 0;
  h1 {
    font-family: serif;
    color: var(--black);
    font-size: 1.725rem;
    margin-bottom: 0.25rem;
  }
  h2 {
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    color: var(--black);
    font-weight: 400;
    opacity: 0.75;
    font-size: 0.85rem;
    letter-spacing: 1px;
  }
`

/*************************/
/********* JSX ***********/
/*************************/
const Header = ({ name, headline }) => {
  return (
    <StyledHeader>
      <h1>{name}</h1>
      <h2>{headline}</h2>
    </StyledHeader>
  )
}

export default Header
