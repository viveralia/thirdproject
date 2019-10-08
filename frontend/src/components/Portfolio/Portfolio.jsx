import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Container from '../Grid/Container'
import Bio from './Bio/Bio'

const Portfolio = ({ portfolio }) => {
  const { name, headline, experience, education } = portfolio.linkedIn.profile
  return (
    <Container>
      <Header name={name} headline={headline} />
      <Bio experience={experience} education={education} />
      <Footer name={name} />
    </Container>
  )
}

export default Portfolio
