// Import Firebase functions
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

// Your Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDUtkJWs9afBX_CZHEwT2H7K69C0XQTEGE',
    authDomain: 'the-ficus.firebaseapp.com',
    projectId: 'the-ficus',
    storageBucket: 'the-ficus.firebasestorage.app',
    messagingSenderId: '165374949350',
    appId: '1:165374949350:web:417a6c9d08308e0b9e0827',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
