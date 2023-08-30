import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import youtube from '../api/youtubeApi'
import { firebaseConfig } from '../../firebase'

export const getFavoriteRequestInParams = async (id: string) => {
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)

    const docRef = doc(db, 'request', `${id}`)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        const response = await youtube.get('/search', {
            params: {
                q: docSnap.data().saveRequest,
                maxResults: docSnap.data().numberRequest,
                order: docSnap.data().sorting ? docSnap.data().sorting : 'relevance'
            }
        })
        return {
            response: response.data.items,
            docSnap: docSnap.data().saveRequest
        }
    }
}
