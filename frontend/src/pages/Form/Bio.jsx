import React, { Component } from 'react'
import Layout from '../../components/Layout/Layout'
import Container from '../../components/Grid/Container'
import Card from '../../components/Cards/Card'
import Form from '../../components/Form/Form'
import SEO from '../../components/SEO/SiteSeo'
import Button from '../../components/Buttons/Button'
import { FiUser } from 'react-icons/fi'
import styled from 'styled-components'

/*************************/
/********* CSS ***********/
/*************************/
const StyledPage = styled.div`
  section {
    > span {
      font-size: 2rem;
    }
  }
  h1 {
    font-size: 1.5rem;
    font-family: var(--serif);
    font-weight: normal;
    color: var(--black);
    margin-bottom: 1rem;
  }
`

/*************************/
/********* JSX ***********/
/*************************/
export default class Bio extends Component {
  state = {
    user: JSON.parse(localStorage.getItem('user')) || { bio: '' }
  }

  handleSubmit = e => {
    e.preventDefault()
    const user = JSON.stringify(this.state.user)
    localStorage.setItem('user', user)
    this.props.history.push('/')
  }

  handleInput = e => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    })
  }

  render() {
    const { bio } = this.state.user
    return (
      <StyledPage>
        <Layout>
          <SEO title='Sign Up' />
          <Container type='fullheight'>
            <Card align='center'>
              <span>
                <FiUser />
              </span>
              <h1>Tell us a little about yourself</h1>
              <Form onSubmit={this.handleSubmit}>
                <div>
                  <textarea
                    onChange={this.handleInput}
                    value={bio || ''}
                    name='bio'
                    cols='30'
                    rows='5'
                    placeholder='A short bio'
                    required
                  ></textarea>
                </div>
                <Button type='submit' modifier='primary'>
                  Next
                </Button>
              </Form>
            </Card>
          </Container>
        </Layout>
      </StyledPage>
    )
  }
}
