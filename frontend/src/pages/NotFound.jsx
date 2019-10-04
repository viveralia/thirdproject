import React from 'react'
import errorImg from '../assets/images/404.svg'
import Layout from '../components/Layout/Layout'
import Container from '../components/Grid/Container'
import Grid from '../components/Grid/Grid'
import ButtonLink from '../components/Buttons/ButtonLink'
import styled from 'styled-components'
import SEO from '../components/SEO/SiteSeo'

/*************************/
/********* CSS ***********/
/*************************/
const StyledNotFound = styled.div`
  text-align: center;
  section {
    div {
      div:first-child {
        padding: 0 4rem;
      }
    }
  }
  h1 {
    font-size: 2.75rem;
    margin-bottom: 1rem;
    font-family: var(--serif);
    color: var(--black);
  }
  p {
    margin-bottom: 1rem;
  }
  @media (min-width: 992px) {
    section {
      div {
        div:first-child {
          padding: 0 0.75rem;
        }
      }
    }
    h1 {
      font-size: 4.5rem;
    }
    p {
      font-size: 1.25rem;
      margin-bottom: 2rem;
    }
  }
`

/*************************/
/********* JSX ***********/
/*************************/
const NotFound = () => {
  return (
    <Layout>
      <SEO title='Not Found' />
      <StyledNotFound>
        <Container type='fullheight'>
          <Grid sm={1} md={2} spacing='3.5rem'>
            <div>
              <img src={errorImg} alt='Not found' />
            </div>
            <div>
              <h1>Oops!</h1>
              <p>The page you were looking for doesn't exist</p>
              <ButtonLink to='/' modifier='primary'>
                Go home
              </ButtonLink>
            </div>
          </Grid>
        </Container>
      </StyledNotFound>
    </Layout>
  )
}

export default NotFound
