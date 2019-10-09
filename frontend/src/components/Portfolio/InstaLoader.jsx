import React from 'react'
import ContentLoader from 'react-content-loader'

const InstaLoader = ({ primaryColor, secondaryColor }) => {
  return (
    <ContentLoader height={100} width={100} speed={1} primaryColor={primaryColor} secondaryColor={secondaryColor}>
      <rect x='0' y='0' rx='0' ry='0' width='100' height='100' />
    </ContentLoader>
  )
}

export default InstaLoader
