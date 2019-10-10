import React, { Component } from 'react'
import Loader from '../components/Portfolio/Loader'
import PortfolioInfo from '../components/Portfolio/PortfolioInfo'
import PORTFOLIO_SERVICE from '../services/portfolio'

export default class Portfolio extends Component {
  state = {
    isLoading: true,
    profile: undefined
  }

  getProfileData = async () => {
    const { linkedInUsername } = this.props.match.params
    const { data } = await PORTFOLIO_SERVICE.getPortfolio(linkedInUsername)
    this.setState({ isLoading: false, profile: data.profile })
  }

  componentDidMount() {
    this.getProfileData()
  }

  render() {
    const { isLoading, profile } = this.state
    const { linkedInUsername } = this.props.match.params

    return <>{isLoading ? <Loader slug={linkedInUsername} /> : <PortfolioInfo profile={profile} />}</>
  }
}
