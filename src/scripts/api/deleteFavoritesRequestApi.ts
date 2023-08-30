import { firebaseConfig } from '../../firebase'
import { initializeApp } from 'firebase/app'
import { updateDoc, deleteDoc, doc, getDoc, getFirestore } from 'firebase/firestore'

export const deleteFavoritesRequestApi = async (id: string, idUser: string | null) => {
    const arrayRequestId: string[] = []
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)

    const docRef = doc(db, 'users', `${idUser}`)
    const docSnap = await getDoc(docRef)
    const userRequestRef = doc(db, 'users', `${idUser}`)

    await deleteDoc(doc(db, 'request', `${id}`))
    if (docSnap.exists()) {
        docSnap.data().saveRequest.map((request: string) => {
            if (request !== id) {
                arrayRequestId.push(request)
            }
        })
        await updateDoc(userRequestRef, {
            saveRequest: arrayRequestId
        })
    }
}
