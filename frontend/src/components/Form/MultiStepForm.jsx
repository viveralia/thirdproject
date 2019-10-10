import React, { Component } from 'react'
import styled from 'styled-components'
import Layout from '../Layout/Layout'
import Container from '../Grid/Container'
import Card from '../Cards/Card'
import SEO from '../SEO/SiteSeo'
import Progress from './Progress'
import Form from './Form'
import Button from '../Buttons/Button'
import { FiChevronRight } from 'react-icons/fi'
import AUTH_SERVICE from '../../services/auth'
import Swal from 'sweetalert2'
import CONFIG_SERVICE from '../../services/config'

/*************************/
/********* CSS ***********/
/*************************/
const StyledForm = styled.div`
  section {
    > span {
      font-size: 2rem;
    }
  }
  h1 {
    font-size: 1.375rem;
    font-family: var(--serif);
    font-weight: normal;
    color: var(--black);
    margin-bottom: 1rem;
  }
  button[type='submit'] {
    display: flex;
    align-items: center;
    margin: auto;
    span {
      font-weight: 600;
      padding-right: 0.25rem;
    }
  }
  @media (min-width: 992px) {
    h1 {
      font-size: 1.725rem;
    }
  }
`

/*************************/
/********* JSX ***********/
/*************************/
export default class MultiStepForm extends Component {
  state = {
    newUser: JSON.parse(localStorage.getItem('newUser')) || {}
  }

  /********* FORM METHODS ***********/
  saveLocalData = e => {
    e.preventDefault()
    localStorage.setItem('newUser', JSON.stringify(this.state.newUser))
    this.props.history.push(`/signup/${this.props.next}`)
  }

  handleInput = e => {
    this.setState({
      newUser: { ...this.state.newUser, [e.target.name]: e.target.value }
    })
  }

  signUpAndLogIn = async () => {
    const { email, instagram, linkedin, password } = this.state.newUser
    // Structuring the data to be posted
    const newUser = {
      email,
      password,
      instagram: {
        username: encodeURI(instagram)
      },
      linkedIn: {
        username: encodeURI(linkedin)
      }
    }
    // Data to be able to auto-login
    const userCredentials = { email, password }
    // Request
    try {
      await AUTH_SERVICE.signUp(newUser)
      const { data } = await AUTH_SERVICE.logIn(userCredentials)
      localStorage.removeItem('newUser')
      localStorage.setItem('activeUser', JSON.stringify(data.user))
      // LinkedIn Scraper
      await AUTH_SERVICE.crawlProfile()
      // Initial Config
      await CONFIG_SERVICE.createConfig()
      this.props.history.push(`/me/${linkedin}/edit`)
    } catch (error) {
      Swal.fire('😩 Try again later ', "We couldn't link your LinkedIn profile", 'error')
      console.log(error)
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.signUpAndLogIn()
  }

  /********* RENDER METHOD ***********/
  render() {
    const {
      input: { type, name, placeholder },
      children,
      title,
      progress
    } = this.props
    const { newUser } = this.state

    return (
      <StyledForm>
        <Layout>
          <SEO title='Sign up' />
          <Container type='fullheight'>
            <Card align='center'>
              <Progress value={progress} max='100' />
              {/* Icon */}
              <span>{children}</span>
              <h1>{title}</h1>
              <Form onSubmit={name !== 'password' ? this.saveLocalData : this.handleSubmit}>
                <div>
                  <input
                    onChange={this.handleInput}
                    value={newUser.hasOwnProperty(name) ? newUser[`${name}`] : ''}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    required
                  />
                </div>
                <Button type='submit' modifier='primary' size='lg'>
                  <span>Next</span>
                  <FiChevronRight />
                </Button>
              </Form>
            </Card>
          </Container>
        </Layout>
      </StyledForm>
    )
  }
}
