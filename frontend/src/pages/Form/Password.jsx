import React from 'react'
import MultiStepForm from '../../components/Form/MultiStepForm'
import { FiLock } from 'react-icons/fi'

const Password = ({ history }) => {
  return (
    <MultiStepForm
      title='Almost there! Just set your password'
      progress={80}
      input={{
        placeholder: '********',
        name: 'password',
        type: 'password'
      }}
      next='/'
      history={history}
    >
      <FiLock />
    </MultiStepForm>
  )
}

export default Password
