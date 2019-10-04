import React from 'react'
import Container from '../Grid/Container'
import styled from 'styled-components'
import ButtonLink from '../Buttons/ButtonLink'
import portfolioImg from '../../assets/images/hero-illustration.svg'
import Grid from '../Grid/Grid'
import Typing from './Typing'

/*************************/
/********* CSS ***********/
/*************************/
const StyledHero = styled.header`
  margin: 5rem 0;
  h1 {
    font-family: var(--serif);
    font-size: 2rem;
    font-weight: normal;
    color: var(--black);
    line-height: 1.225;
    margin-bottom: 1rem;
    span {
      background: var(--action);
    }
  }
  p {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  img {
    width: 100%;
  }
  @media (min-width: 992px) {
    margin: 1rem 0;
    h1 {
      font-size: 3rem;
    }
  }
`

/*************************/
/********* JSX ***********/
/*************************/
const Hero = () => {
  return (
    <Container>
      <StyledHero>
        <Grid sm={1} md={2} spacing='5rem'>
          <div>
            <h1>
              Share{' '}
              <span>
                your <Typing strings={['talent', 'photos', 'designs', 'talent']} />
              </span>{' '}
              <br /> with the world
            </h1>
            <p>The easiest and fastest way to get a webpage. No credit card required.</p>
            <ButtonLink to='/signup/email' modifier='primary'>
              Get your page
            </ButtonLink>
          </div>
          <div>
            <img src={portfolioImg} alt='Portfolio' />
          </div>
        </Grid>
      </StyledHero>
    </Container>
  )
}

export default Hero
