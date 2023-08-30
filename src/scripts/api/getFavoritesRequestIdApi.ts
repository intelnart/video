import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase'
import { doc, getDoc, getFirestore } from 'firebase/firestore'

export const getFavoritesRequestIdAPI = async (id: string | null) => {
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const docRef = doc(db, 'users', `${id}`)
    return await getDoc(docRef)
}
