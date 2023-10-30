import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyD7-cy0keoioEiOivK6VJZtPm6BMsqVavk",
    authDomain: "diplomaa-50e35.firebaseapp.com",
    projectId: "diplomaa-50e35",
    storageBucket: "diplomaa-50e35.appspot.com",
    messagingSenderId: "489666908037",
    appId: "1:489666908037:web:96764ea6ebedb250f4beec",
    measurementId: "G-JC0PT09Y5M"
  };

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }