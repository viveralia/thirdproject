import React from 'react'
import Container from '../Grid/Container'

const Loader = ({ slug }) => {
  return (
    <Container type='portfolio-fullheight'>
      <h2>{slug}</h2>
      <p>Loading...</p>
    </Container>
  )
}

export default Loader
