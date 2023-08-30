import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase'

const app = initializeApp(firebaseConfig)
getFirestore(app)

export const doSingIn = (email: string, password: string) => {
    const auth = getAuth()
    return signInWithEmailAndPassword(auth, email, password)
}
