import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyDUtkJWs9afBX_CZHEwT2H7K69C0XQTEGE',
    authDomain: 'the-ficus.firebaseapp.com',
    projectId: 'the-ficus',
    storageBucket: 'the-ficus.firebasestorage.app',
    messagingSenderId: '165374949350',
    appId: '1:165374949350:web:417a6c9d08308e0b9e0827',
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export const currentUser = async () => {
    return await auth.currentUser
}

const usersCollection = collection(db, 'users')

export const addUser = async (uid, user) => {
    const sanitizedUser = {
        username: user.username,
        email: user.email,
        city: user.city,
    }

    try {
        const userDocRef = doc(usersCollection, uid)
        await setDoc(userDocRef, sanitizedUser)
    } catch (e) {
        console.error("Erreur lors de l'ajout de l'utilisateur: ", e)
    }
}

export const getUsers = async () => {
    const querySnapshot = await getDocs(usersCollection)
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => `, doc.data())
    })
}

export const getUserById = async (userId) => {
    if (!userId) {
        return
    }

    try {
        const userDocRef = doc(usersCollection, userId)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
            return userDoc.data()
        } else {
            console.warn('No user found for the provided ID.')
            return null
        }
    } catch (error) {
        console.error('Error retrieving the user:', error)
        throw error // Rethrow the error to allow handling by caller
    }
}

export const updateUser = async (userId, updatedData) => {
    const userDoc = doc(db, 'users', userId)
    try {
        await updateDoc(userDoc, updatedData)
        console.log('Utilisateur mis à jour!')
    } catch (e) {
        console.error("Erreur lors de la mise à jour de l'utilisateur: ", e)
    }
}

export const deleteUser = async (userId) => {
    const userDoc = doc(db, 'users', userId)
    try {
        await deleteDoc(userDoc)
        console.log('Utilisateur supprimé!')
    } catch (e) {
        console.error("Erreur lors de la suppression de l'utilisateur: ", e)
    }
}
