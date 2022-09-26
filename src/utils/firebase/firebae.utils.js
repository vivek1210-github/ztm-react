// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDeGpqMhOr4yXLjbm603Xuc0MiaohxiUfo',
  authDomain: 'crwn-clothing-db-74e3f.firebaseapp.com',
  projectId: 'crwn-clothing-db-74e3f',
  storageBucket: 'crwn-clothing-db-74e3f.appspot.com',
  messagingSenderId: '1030700202727',
  appId: '1:1030700202727:web:4bf7c5943ef048ecda8042',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// GoogleAuthProvider is a class
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log(`error creating user`, error.message)
    }
  } else {
    return userDocRef
  }

  // if user data exists
  // create /set the document with thd data in my collection

  // if user does not exist
  //
}
