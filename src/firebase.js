import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDmWXzdGC1_mu-kL1KhHPEWoQ_CzwU4Gl0",
    authDomain: "pertona-dc047.firebaseapp.com",
    projectId: "pertona-dc047",
    storageBucket: "pertona-dc047.firebasestorage.app",
    messagingSenderId: "971603561821",
    appId: "1:971603561821:web:ff45ac8effeb7f2653acb4",
    measurementId: "G-M76C189DPH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Add this for debugging
auth.onAuthStateChanged((user) => {
  console.log('Auth state changed:', user);
}); 