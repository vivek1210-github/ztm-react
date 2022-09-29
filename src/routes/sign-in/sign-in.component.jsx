import { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'
import {
  auth,
  signInWithGooglePopUp,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebae.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
  useEffect(() => {
    let code = async () => {
      const response = await getRedirectResult(auth)
      if (response) {
        const { user } = response
        const userDocRef = await createUserDocumentFromAuth(user)
      }
    }

    code()
  }, [])

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp()
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <h2>Sign in Page</h2>
      <button onClick={logGoogleUser}>SignIn with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        SignIn with Google Redirect
      </button>
      <SignUpForm />
    </div>
  )
}

export default SignIn
