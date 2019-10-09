import React, { Component } from 'react'
import styled from 'styled-components'
import Container from '../Grid/Container'
import meta from '../../constants/meta.json'

/*************************/
/********* CSS ***********/
/*************************/
const StyledPortfolio = styled.div`
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Sans:500,600&display=swap');
  font-family: ${props => props.theme === 'philippe' && "'IBM Plex Sans', sans - serif"};
  background: ${props => props.theme === 'philippe' && '#dbd0c4'};
  color: ${props => props.theme === 'philippe' && '#232323'};
  header {
    width: 100%;
    padding: 1.5rem 0;
    h1 {
      font-size: 1.5rem;
      line-height: 1.25;
      font-weight: 600;
      color: ${props => props.theme === 'philippe' && '#232323'};
    }
    h3 {
      font-size: 1.25rem;
      color: ${props => props.theme === 'philippe' && '#a79a8d'};
      font-weight: 500;
    }
  }
  footer {
    width: 100%;
    padding: 1.5rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
`

/*************************/
/********* JSX ***********/
/*************************/
export default class PortfolioInfo extends Component {
  render() {
    const { name, headline, education, experience } = this.props.profile.linkedIn.profile

    return (
      <StyledPortfolio theme='philippe'>
        <Container type='portfolio-fullheight'>
          {/* Header */}
          <header>
            <h1>{name}</h1>
            <h3>{headline}</h3>
          </header>
          {/* Footer */}
          <footer>
            <div>
              <small>
                &copy; {new Date().getFullYear()} {name}
              </small>
            </div>
            <div>
              <small>Made with {meta.name}</small>
            </div>
          </footer>
        </Container>
      </StyledPortfolio>
    )
  }
}
