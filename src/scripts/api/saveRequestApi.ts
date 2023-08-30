import { doc, getFirestore, updateDoc, getDoc, collection, addDoc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase'

export const saveRequestAPI = async (
    id: string | null,
    requestTitle: string,
    sliderValue: number,
    sorting: string,
    nameRequest: string
) => {
    const saveRequestUser = []
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const docRef = doc(db, 'users', `${id}`)
    const docSnap = await getDoc(docRef)

    //Создание коллекции сохраненных запросов
    const userRequestRef = await addDoc(collection(db, 'request'), {
        saveRequest: requestTitle,
        numberRequest: sliderValue,
        sorting: sorting,
        nameRequest: nameRequest
    })
    if (docSnap.exists()) {
        docSnap.data().saveRequest.map((request: string) => {
            saveRequestUser.push(request)
        })
    }
    saveRequestUser.push(userRequestRef.id)
    await updateDoc(docRef, {
        saveRequest: saveRequestUser,
        nameRequest: nameRequest
    })
    const middleElement = {
        saveRequest: requestTitle,
        numberRequest: sliderValue,
        sorting: sorting,
        nameRequest: nameRequest,
        id: docSnap.data()?.id
    }

    return {
        saveRequestUser,
        requestTitle,
        middleElement
    }
}
