import {
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebae.utils'

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp()
    const userDocRef = await createUserDocumentFromAuth(user)
    // console.log(response)
  }

  return (
    <div>
      <h2>Sign in Page</h2>
      <button onClick={logGoogleUser}>SignIn with Google Popup</button>
    </div>
  )
}

export default SignIn
