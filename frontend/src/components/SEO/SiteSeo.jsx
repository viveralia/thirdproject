import React from 'react'
import Helmet from 'react-helmet'
import meta from '../../constants/meta.json'

const SEO = ({ title, description }) => {
  return (
    <Helmet title={`${title || meta.tagline} | ${meta.name}`}>
      <meta name='description' content={description || meta.description} />
    </Helmet>
  )
}

export default SEO
