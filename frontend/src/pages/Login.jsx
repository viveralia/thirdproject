import React, { Component } from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout/Layout'
import SEO from '../components/SEO/SiteSeo'
import Container from '../components/Grid/Container'
import Card from '../components/Cards/Card'
import Form from '../components/Form/Form'
import Button from '../components/Buttons/Button'
import { FiChevronRight, FiLogIn } from 'react-icons/fi'
import AUTH_SERVICE from '../services/auth'

/*************************/
/********* CSS ***********/
/*************************/
const StyledForm = styled.div`
  section {
    > span {
      font-size: 2rem;
    }
  }
  .headline {
    margin-bottom: 2rem;
    h1 {
      font-size: 1.375rem;
      font-family: var(--serif);
      font-weight: normal;
      color: var(--black);
    }
  }
  button {
    display: flex;
    align-items: center;
    margin: 2.25rem auto 0 auto;
    span {
      font-weight: 600;
      padding-right: 0.25rem;
    }
  }
  @media (min-width: 992px) {
    .headline {
      h1 {
        font-size: 1.725rem;
      }
    }
  }
`

/*************************/
/********* JSX ***********/
/*************************/
export default class Login extends Component {
  state = {
    userCredentials: {
      email: '',
      password: ''
    }
  }

  /********* FORM METHODS ***********/
  handleInput = e => {
    this.setState({
      userCredentials: { ...this.state.userCredentials, [e.target.name]: e.target.value }
    })
  }

  logIn = async () => {
    const { userCredentials } = this.state
    const { data } = await AUTH_SERVICE.logIn(userCredentials)
    localStorage.setItem('activeUser', JSON.stringify(data.user))
    this.props.history.push(`/me/${data.user.linkedIn.username}/edit`)
  }

  handleSubmit = async e => {
    e.preventDefault()
    this.logIn()
  }

  /********* RENDER METHOD ***********/
  render() {
    const {
      userCredentials: { email, password }
    } = this.state

    return (
      <StyledForm>
        <Layout>
          <SEO title='Log in' />
          <Container type='fullheight'>
            <Card align='center'>
              <span>
                <FiLogIn />
              </span>
              <div className='headline'>
                <h1>Welcome back!</h1>
                <p>Log in to your account</p>
              </div>
              <Form onSubmit={this.handleSubmit}>
                <div>
                  <input
                    onChange={this.handleInput}
                    value={email}
                    type='email'
                    name='email'
                    placeholder='Email'
                    required
                  />
                </div>
                <div>
                  <input
                    onChange={this.handleInput}
                    value={password}
                    type='password'
                    name='password'
                    placeholder='Password'
                    required
                  />
                </div>
                <Button type='submit' modifier='primary' size='lg'>
                  <span>Log In</span>
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
