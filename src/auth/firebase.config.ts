import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDY-cc7T9q-Bxx-YP39F7yI0R2RObXhz10',
    authDomain: 'agendatec-firebase',
    projectId: 'agendatec-firebase',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);