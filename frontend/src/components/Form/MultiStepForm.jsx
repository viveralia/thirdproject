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
  button {
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

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state.newUser)
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
                <Button type='submit' modifier='primary'>
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
