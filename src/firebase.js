import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDKdchyWOxelCgsT2UTwVHjU66NQkZAVJA',
  authDomain: 'birthday-edfaf.firebaseapp.com',
  projectId: 'birthday-edfaf',
  storageBucket: 'birthday-edfaf.firebasestorage.app',
  messagingSenderId: '679752722880',
  appId: '1:679752722880:web:32523c09617e3b7ef3c025',
  measurementId: 'G-3VBKKDFTCV'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
