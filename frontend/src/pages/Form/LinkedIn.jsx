import React from 'react'
import MultiStepForm from '../../components/Form/MultiStepForm'
import { FaLinkedinIn } from 'react-icons/fa'

const Instagram = ({ history }) => {
  return (
    <MultiStepForm
      title='Awesome! Now you only need your LinkedIn user'
      progress={60}
      input={{
        placeholder: 'username',
        name: 'linkedin',
        type: 'text'
      }}
      next='password'
      history={history}
    >
      <FaLinkedinIn />
    </MultiStepForm>
  )
}

export default Instagram
