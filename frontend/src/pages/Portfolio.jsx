import React, { Component } from 'react'
import Loader from '../components/Portfolio/Loader'
import PortfolioInfo from '../components/Portfolio/PortfolioInfo'
import PORTFOLIO_SERVICE from '../services/portfolio'

export default class Portfolio extends Component {
  state = {
    isLoading: true,
    profile: undefined,
    theme: 'pascale'
  }

  getProfileData = async () => {
    const { linkedInUsername } = this.props.match.params
    const { data } = await PORTFOLIO_SERVICE.getPortfolio(linkedInUsername)
    this.setState({ isLoading: false, profile: data })
  }

  componentDidMount() {
    this.getProfileData()
  }

  render() {
    const { isLoading, profile, theme } = this.state
    const { slug } = this.props.match.params

    return <div>{isLoading ? <Loader slug={slug} /> : <PortfolioInfo profile={profile} theme={theme} />}</div>
  }
}
