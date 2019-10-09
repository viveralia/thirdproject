import React, { Component } from 'react'
import styled from 'styled-components'
import Container from '../Grid/Container'
import Grid from '../Grid/Grid'
import meta from '../../constants/meta.json'
import { getInstagramFeedInfo } from 'origen-react-instagram-feed'
import { Link } from 'react-router-dom'
import SEO from '../SEO/SiteSeo'

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
    div {
      position: fixed;
      h1 {
        font-size: 1.375rem;
        line-height: 1.25;
        font-weight: 600;
        color: ${props => props.theme === 'philippe' && '#232323'};
      }
      h3 {
        font-size: 1.125rem;
        color: ${props => props.theme === 'philippe' && '#a79a8d'};
        font-weight: 500;
      }
    }
  }
  .portfolio {
    margin-top: 5rem;
    h2 {
      line-height: 1.25;
      font-size: 1.125rem;
      margin-bottom: 2rem;
      opacity: 0.475;
      font-weight: 500;
    }
    img {
      width: 100%;
    }
  }
  footer {
    width: 100%;
    margin-top: 4rem;
    padding: 1.5rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  @media (min-width: 992px) {
    .portfolio {
      display: grid;
      grid-template-columns: 30% 70%;
      grid-gap: 3rem;
    }
  }
`

/*************************/
/********* JSX ***********/
/*************************/
export default class PortfolioInfo extends Component {
  state = {
    instagramFeed: undefined
  }

  setInstagramData = async username => {
    const instagramFeed = await getInstagramFeedInfo(username)
    this.setState({ instagramFeed })
  }

  componentDidMount() {
    const { username } = this.props.profile.instagram
    this.setInstagramData(username)
  }

  render() {
    const { name, headline, about, education, experience } = this.props.profile.linkedIn.profile
    const { instagram } = this.props.profile
    const { instagramFeed } = this.state

    return (
      <StyledPortfolio theme='philippe'>
        <SEO title={name} description={about} />
        <Container type='portfolio-fullheight'>
          {/* Header */}
          <header>
            <div>
              <h1>{name}</h1>
              <h3>{headline}</h3>
            </div>
          </header>
          {/* Portfolio */}
          <section className='portfolio'>
            {/* About */}
            <div>
              <h2>{about}</h2>
            </div>
            {/* Instagram */}
            {instagram.username && (
              <Grid sm={1} md={2} spacing='5rem'>
                {!instagramFeed ? (
                  <p>Loading...</p>
                ) : (
                  instagramFeed.media.map(post => (
                    <img key={post.id} src={post.displayImage} alt={post.accessiblityCaption} />
                  ))
                )}
              </Grid>
            )}
          </section>
          {/* Footer */}
          <footer>
            <div>
              <small>
                &copy; {new Date().getFullYear()} {name}
              </small>
            </div>
            <div>
              <Link to='/'>
                <small>Made with {meta.name}</small>
              </Link>
            </div>
          </footer>
        </Container>
      </StyledPortfolio>
    )
  }
}
