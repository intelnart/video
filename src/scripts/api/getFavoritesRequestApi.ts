import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase'
import { doc, getDoc, getFirestore } from 'firebase/firestore'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const getRequestInfo = async (favoriteQueriesID: string[]) => {
    const promises = favoriteQueriesID.map(favoriteQuerieID => {
        const docRef = doc(db, 'request', `${favoriteQuerieID}`)
        return getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                return {
                    saveRequest: docSnap.data().saveRequest,
                    numberRequest: docSnap.data().numberRequest,
                    sorting: docSnap.data().sorting,
                    nameRequest: docSnap.data().nameRequest,
                    id: docSnap.id
                }
            }
            return null
        })
    })
    return Promise.all(promises)
}
