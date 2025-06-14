import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import * as process from "process";

// Firebase API Key is set in .env file
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || 'FirebaseApiKey_is_missing',
    authDomain: 'agendatec-firebase',
    projectId: 'agendatec-firebase',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);