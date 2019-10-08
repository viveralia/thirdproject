import React, { Component } from 'react'
import Axios from 'axios'
import Portfolio from '../components/Portfolio/Portfolio'

export default class PortfolioPage extends Component {
  state = {
    isLoading: true,
    portfolio: {
      linkedIn: {
        profile: {
          name: undefined,
          headline: undefined,
          location: undefined
        }
      }
    }
  }

  getPortfolio = async () => {
    const { data } = await Axios.get(`http://localhost:5000/api/portfolio/${this.props.match.params.linkedInUser}`)
    this.setState({ isLoading: false, portfolio: data.user })
  }

  componentDidMount() {
    this.getPortfolio()
  }

  render() {
    const { isLoading, portfolio } = this.state

    return <div>{isLoading ? <p>Loading...</p> : <Portfolio portfolio={portfolio} />}</div>
  }
}
