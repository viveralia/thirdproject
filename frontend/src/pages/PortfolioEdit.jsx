import React, { Component } from 'react'
import Loader from '../components/Portfolio/Loader'
import PortfolioInfo from '../components/Portfolio/PortfolioInfo'
import PORTFOLIO_SERVICE from '../services/portfolio'
import AUTH_SERVICE from '../services/auth'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FiHome, FiLogOut } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import Button from '../components/Buttons/Button'
import Grid from '../components/Grid/Grid'
import CONFIG_SERVICE from '../services/config'
import Swal from 'sweetalert2'

/*************************/
/********* CSS ***********/
/*************************/
const StyledEdit = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  > div:last-child {
    display: none;
  }

  @media (min-width: 992px) {
    grid-template-columns: 23% 77%;
    > div:last-child {
      display: block;
      padding: 0 2rem;
    }
  }
`

const StyledSidebar = styled.aside`
  background: var(--background);
  font-family: var(--sans);
  color: var(--washedBlack);
  box-shadow: rgba(32, 33, 36, 0.1) 2px 3px 9px;
  > div {
    padding: 2rem 1rem;
    position: sticky;
    top: 0;
    section:first-child {
      margin-top: 0;
      a {
        display: flex;
        align-items: center;
        font-weight: 600;
        color: var(--black);
        margin-bottom: 1rem;
        :last-child {
          margin-bottom: none;
        }
        svg {
          margin-right: 0.75rem;
          font-size: 1.25rem;
        }
      }
    }

    section {
      margin-top: 5rem;
      h2 {
        font-size: 0.925rem;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 1rem;
      }
      form {
        div {
          margin-bottom: 1.25rem;
          label {
            display: block;
            font-size: 1rem;
            margin-bottom: 0.5rem;
          }
          input,
          textarea {
            display: block;
            width: 100%;
            font-size: 1rem;
            padding: 0.375rem 0.75rem;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: 0;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }
        }
      }
      :nth-child(2) {
        div {
          button {
            div {
              text-align: center;
              width: 100%;
              padding: 1.5rem 0;
            }
            :first-child {
              div {
                background: #dbd0c4;
                color: #232323;
                font-family: 'IBM Plex Mono', monospace;
              }
            }
            :last-child {
              div {
                background: #333;
                color: #fff;
                font-family: 'IBM Plex Sans', sans-serif;
              }
            }
          }
        }
      }
      :last-child,
      :nth-child(2) {
        button {
          font-family: var(--sans);
          font-size: 1rem;
          background: transparent;
          border: none;
          font-weight: 500;
          transition: all 0.175s ease;
          display: inline-block;
          position: relative;
          cursor: pointer;
          appearance: none;
          display: flex;
          align-items: center;
          font-weight: 600;
          color: var(--black);
          svg {
            margin-right: 0.75rem;
            font-size: 1.25rem;
          }
        }
      }
    }
  }
  @media (min-width: 992px) {
    > div {
      section {
        h2 {
          font-size: 0.875rem;
        }
        form {
          div {
            label {
              font-size: 0.875rem;
            }
            input,
            textarea {
              font-size: 0.875rem;
            }
          }
        }
      }
    }
  }
`

/*************************/
/********* JSX ***********/
/*************************/
export default class PortfolioEdit extends Component {
  state = {
    user: JSON.parse(localStorage.getItem('activeUser')),
    isLoading: true,
    profile: undefined
  }

  getProfileData = async () => {
    const { linkedInUsername } = this.props.match.params
    const { data } = await PORTFOLIO_SERVICE.getPortfolio(linkedInUsername)
    this.setState({ isLoading: false, profile: data.profile })
  }

  componentDidMount() {
    this.state.user.linkedIn.username === this.props.match.params.linkedInUsername
      ? this.getProfileData()
      : this.props.history.push('/login')
  }

  handleInput = e => {
    this.setState({
      profile: {
        ...this.state.profile,
        linkedIn: {
          ...this.state.profile.linkedIn,
          profile: { ...this.state.profile.linkedIn.profile, [e.target.name]: e.target.value }
        }
      }
    })
  }

  changeTheme = theme => {
    this.setState({
      profile: {
        ...this.state.profile,
        config: {
          ...this.state.profile.config,
          theme
        }
      }
    })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { profile } = this.state.profile.linkedIn
    await PORTFOLIO_SERVICE.updatePortfolio(profile)
    const { config } = this.state.profile
    await CONFIG_SERVICE.updateConfig(config)
    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'Changes saved successfully',
      showConfirmButton: false,
      toast: true,
      timer: 2000
    })
  }

  logOutUser = async () => {
    await AUTH_SERVICE.logOut()
    localStorage.removeItem('activeUser')
    this.props.history.push('/')
  }

  render() {
    const { isLoading, profile } = this.state
    const { linkedInUsername } = this.props.match.params
    console.log(window.locaton)

    return (
      <>
        {isLoading ? (
          <Loader slug={linkedInUsername} />
        ) : (
          <StyledEdit>
            <StyledSidebar>
              <div>
                {/* Visit */}
                <section>
                  <Link to={`/me/${this.props.match.params.linkedInUsername}`}>
                    <FiHome /> Visit your site
                  </Link>
                  <a
                    href={`https://wa.me/?text=${encodeURI(`${window.location}`).substring(
                      0,
                      encodeURI(window.location).length - 5
                    )}`}
                    rel='noopener noreferrer'
                    target='_blank'
                  >
                    <FaWhatsapp /> Share your site
                  </a>
                </section>
                {/* Theme */}
                <section>
                  <h2>Theme</h2>
                  <Grid sm={2} md={2} spacing='1rem'>
                    <button onClick={() => this.changeTheme('philippe')}>
                      <div>Philippe</div>
                    </button>
                    <button onClick={() => this.changeTheme('pascale')}>
                      <div>Pascale</div>
                    </button>
                  </Grid>
                </section>
                {/* Edit */}
                <section>
                  <h2>Edit</h2>
                  <form onSubmit={this.handleSubmit}>
                    <div>
                      <label htmlFor='name'>Name</label>
                      <input
                        onChange={this.handleInput}
                        type='text'
                        name='name'
                        id='name'
                        value={this.state.profile.linkedIn.profile.name}
                      />
                    </div>
                    <div>
                      <label htmlFor='headline'>Headline</label>
                      <input
                        onChange={this.handleInput}
                        type='text'
                        name='headline'
                        id='headline'
                        value={this.state.profile.linkedIn.profile.headline}
                      />
                    </div>
                    <div>
                      <label htmlFor='about'>About</label>
                      <textarea
                        onChange={this.handleInput}
                        name='about'
                        id='about'
                        cols='10'
                        rows='4'
                        maxLength='100'
                        value={this.state.profile.linkedIn.profile.about}
                      ></textarea>
                    </div>
                    <Button type='submit' modifier='primary'>
                      Update
                    </Button>
                  </form>
                </section>
                {/* Log Out */}
                <section>
                  <button onClick={() => this.logOutUser()}>
                    <FiLogOut /> Log out
                  </button>
                </section>
              </div>
            </StyledSidebar>
            <PortfolioInfo profile={profile} />
          </StyledEdit>
        )}
      </>
    )
  }
}
