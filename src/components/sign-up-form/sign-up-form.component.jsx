import { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebae.utils'

import FormInput from '../form-input/form-input.component'

import './sign-up-form.styles.scss'

import Button from '../button/button.component'

// uniform object
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const { displayName, email, password, confirmPassword } = formFields

  const handleChange = (event) => {
    const { name, value } = event.target //target gives emitting event
    setFormFields({
      ...formFields,
      [name]: value, // object notation
    })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)

      // create user with display name
      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email already in use')
      }
      console.error('user creation encountered an error', error)
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          name='displayName'
          value={displayName}
          maxlength='50'
          onChange={handleChange}
        />

        <FormInput
          label='Email'
          type='email'
          required
          name='email'
          onChange={handleChange}
          maxlength='50'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          name='password'
          maxlength='20'
          onChange={handleChange}
          value={password}
        />

        <FormInput
          label='Confirm Password'
          type='password'
          required
          name='confirmPassword'
          onChange={handleChange}
          maxlength='20'
          value={confirmPassword}
        />
        <Button buttonType='google' type='submit'>
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default SignUpForm
