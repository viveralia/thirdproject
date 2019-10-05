import React from 'react'
import MultiStepForm from '../../components/Form/MultiStepForm'
import { FiMail } from 'react-icons/fi'

const Email = ({ history }) => {
  return (
    <MultiStepForm
      title="Let's start with your email"
      progress={20}
      input={{
        placeholder: 'Your email here',
        name: 'email',
        type: 'email'
      }}
      next='instagram'
      history={history}
    >
      <FiMail />
    </MultiStepForm>
  )
}

export default Email
