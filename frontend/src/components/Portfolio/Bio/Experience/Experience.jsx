import React from 'react'
import ExperienceItem from './ExperienceItem'

const Experience = ({ experience }) => {
  return (
    <div>
      <h2>Experience</h2>
      <ul>
        {experience.map(e => (
          <ExperienceItem key={e._id} data={e} />
        ))}
      </ul>
    </div>
  )
}

export default Experience
