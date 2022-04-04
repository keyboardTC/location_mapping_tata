import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD4Xy0BuhDq2JtwcE7gvYjoNVbmMKI-9Jw",
    authDomain: "location-mapping-f68fb.firebaseapp.com",
    projectId: "location-mapping-f68fb",
    storageBucket: "location-mapping-f68fb.appspot.com",
    messagingSenderId: "61785893756",
    appId: "1:61785893756:web:85bea8d8c817ead3ed12f9"
  };
  
//   Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);