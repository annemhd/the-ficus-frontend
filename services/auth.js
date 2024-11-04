import { initializeApp } from 'firebase/app'
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyDUtkJWs9afBX_CZHEwT2H7K69C0XQTEGE',
    authDomain: 'the-ficus.firebaseapp.com',
    projectId: 'the-ficus',
    storageBucket: 'the-ficus.firebasestorage.app',
    messagingSenderId: '165374949350',
    appId: '1:165374949350:web:417a6c9d08308e0b9e0827',
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        return userCredential.user
    } catch (error) {
        console.error('Error registering user:', error.message)
        throw error
    }
}

export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return userCredential.user
    } catch (error) {
        console.error('Error logging in:', error.message)
        throw error
    }
}

export const logout = async () => {
    try {
        await signOut(auth)
        const currentUser = useCookie('current-user')
        currentUser.value = null
    } catch (error) {
        console.error('Error logging out:', error.message)
        throw error
    }
}

export const onAuthStateChange = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(user)
    })
}
