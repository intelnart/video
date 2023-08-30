import { firebaseConfig } from '../../firebase'
import { initializeApp } from 'firebase/app'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'

export const editExistingRequestAPI = async (
    idSavedRequest: string,
    request: string,
    sliderValue: number,
    valueSelect: string,
    nameRequest: string
) => {
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const existingRequestRef = doc(db, 'request', `${idSavedRequest}`)

    await updateDoc(existingRequestRef, {
        saveRequest: request,
        numberRequest: sliderValue,
        sorting: valueSelect,
        nameRequest: nameRequest
    })
}
