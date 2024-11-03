import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore'

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

const usersCollection = collection(db, 'users')

// Ajouter un nouvel utilisateur
export const addUser = async (uid, user) => {
    const sanitizedUser = {
        username: user.username,
        email: user.email,
        city: user.city,
    }

    try {
        const userDocRef = doc(usersCollection, uid)
        await setDoc(userDocRef, sanitizedUser)

        console.log('Utilisateur ajouté avec ID: ', uid)
    } catch (e) {
        console.error("Erreur lors de l'ajout de l'utilisateur: ", e)
    }
}

// Lire tous les utilisateurs
export const getUsers = async () => {
    const querySnapshot = await getDocs(usersCollection)
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => `, doc.data())
    })
}

// Mettre à jour un utilisateur
export const updateUser = async (userId, updatedData) => {
    const userDoc = doc(db, 'users', userId)
    try {
        await updateDoc(userDoc, updatedData)
        console.log('Utilisateur mis à jour!')
    } catch (e) {
        console.error("Erreur lors de la mise à jour de l'utilisateur: ", e)
    }
}

// Supprimer un utilisateur
export const deleteUser = async (userId) => {
    const userDoc = doc(db, 'users', userId)
    try {
        await deleteDoc(userDoc)
        console.log('Utilisateur supprimé!')
    } catch (e) {
        console.error("Erreur lors de la suppression de l'utilisateur: ", e)
    }
}
