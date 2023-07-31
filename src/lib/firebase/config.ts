import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCBY3YazxN7Sv__1zXgTt-Qhkj4z_vNoh4',
  authDomain: 'app-fit-journey.firebaseapp.com',
  projectId: 'app-fit-journey',
  storageBucket: 'app-fit-journey.appspot.com',
  messagingSenderId: '379481782384',
  appId: '1:379481782384:web:0570f40a59a179aaa11cb5',
  measurementId: 'G-58G7RPL8FL',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

console.log('FIRESTORE_DB', FIRESTORE_DB);
