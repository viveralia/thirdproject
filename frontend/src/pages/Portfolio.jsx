import React, { Component } from 'react'
import Axios from 'axios'
import Loader from '../components/Portfolio/Loader'
import PortfolioInfo from '../components/Portfolio/PortfolioInfo'

export default class Portfolio extends Component {
  state = {
    isLoading: true,
    profile: undefined,
    theme: 'pascale'
  }

  getProfileData = async () => {
    const { data } = await Axios.get(`http://localhost:5000/api/portfolio/${this.props.match.params.slug}`)
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
