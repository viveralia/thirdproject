import React from 'react'
import Container from '../../Grid/Container'
import Grid from '../../Grid/Grid'
import Experience from './Experience/Experience'

const Bio = ({ experience, education }) => {
  return (
    <Container>
      <Grid sm={1} md={4}>
        <Experience experience={experience} />
      </Grid>
    </Container>
  )
}

export default Bio
