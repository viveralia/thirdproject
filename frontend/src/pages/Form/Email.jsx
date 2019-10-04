// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import Container from '../../components/Grid/Container'
// import Card from '../../components/Cards/Card'
// import Form from '../../components/Form/Form'
// import SEO from '../../components/SEO/SiteSeo'
// import Button from '../../components/Buttons/Button'
// import { FiMail } from 'react-icons/fi'
// import styled from 'styled-components'

// /*************************/
// /********* CSS ***********/
// /*************************/
// const StyledPage = styled.div`
//   section {
//     > span {
//       font-size: 2rem;
//     }
//   }
//   h1 {
//     font-size: 1.5rem;
//     font-family: var(--serif);
//     font-weight: normal;
//     color: var(--black);
//     margin-bottom: 1rem;
//   }
// `

// /*************************/
// /********* JSX ***********/
// /*************************/
// const Email = ({ history }) => {
//   const handleSubmit = e => {
//     e.preventDefault()
//     history.push('/')
//   }

//   return (
//     <StyledPage>
//       <Layout>
//         <SEO title='Sign Up' />
//         <Container type='fullheight'>
//           <Card align='center'>
//             <span>
//               <FiMail />
//             </span>
//             <h1>Let's start with your email</h1>
//             <Form onSubmit={handleSubmit}>
//               <div>
//                 <input type='email' placeholder='Your email address' required />
//               </div>
//               <Button type='submit' modifier='primary'>
//                 Next
//               </Button>
//             </Form>
//           </Card>
//         </Container>
//       </Layout>
//     </StyledPage>
//   )
// }

// export default Email

import React, { Component } from 'react'
import Layout from '../../components/Layout/Layout'
import Container from '../../components/Grid/Container'
import Card from '../../components/Cards/Card'
import Form from '../../components/Form/Form'
import SEO from '../../components/SEO/SiteSeo'
import Button from '../../components/Buttons/Button'
import { FiMail } from 'react-icons/fi'
import styled from 'styled-components'
import Progress from '../../components/Form/Progress'

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
export default class Email extends Component {
  state = {
    user: JSON.parse(localStorage.getItem('user')) || { email: '' }
  }

  handleSubmit = e => {
    e.preventDefault()
    const user = JSON.stringify(this.state.user)
    localStorage.setItem('user', user)
    this.props.history.push('/signup/instagram')
  }

  handleInput = e => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    })
  }

  render() {
    const { email } = this.state.user
    return (
      <StyledPage>
        <Layout>
          <SEO title='Sign Up' />
          <Container type='fullheight'>
            <Card align='center'>
              <Progress value='10' max='100' />
              <span>
                <FiMail />
              </span>
              <h1>Let's start with your email</h1>
              <Form onSubmit={this.handleSubmit}>
                <div>
                  <input
                    onChange={this.handleInput}
                    value={email || ''}
                    type='email'
                    name='email'
                    placeholder='Your email address'
                    required
                  />
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
