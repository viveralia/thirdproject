import React from 'react'
import MultiStepForm from '../../components/Form/MultiStepForm'
import { FiInstagram } from 'react-icons/fi'

const Instagram = ({ history }) => {
  return (
    <MultiStepForm
      title='Create the site with your instagram account'
      progress={33.33}
      input={{
        placeholder: 'username',
        name: 'instagram',
        type: 'text'
      }}
      next='linkedin'
      history={history}
    >
      <FiInstagram />
    </MultiStepForm>
  )
}

export default Instagram
