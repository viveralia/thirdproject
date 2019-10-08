import React from 'react'

const ExperienceItem = ({ data: { position, company } }) => {
  return (
    <li>
      <h3>{position}</h3>
      <h4>{company}</h4>
    </li>
  )
}

export default ExperienceItem
