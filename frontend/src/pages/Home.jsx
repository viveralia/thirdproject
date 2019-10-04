import React from 'react'
import Layout from '../components/Layout/Layout'
import Hero from '../components/Home/Hero'
import SEO from '../components/SEO/SiteSeo'

const Home = () => {
  return (
    <Layout>
      <SEO />
      <Hero />
    </Layout>
  )
}

export default Home
