import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import * as firebaseAdmin from 'firebase-admin';
import * as fs from 'fs';
import * as path from "node:path";

let firebaseServiceAccount: firebaseAdmin.ServiceAccount | undefined = undefined;
const firebaseFilePath : string = path.join(__dirname, '..', 'firebase_service_account.json');

if (!fs.existsSync(firebaseFilePath)) {
    console.log('Firebase service account key file not found at:', firebaseFilePath);
} else {
    console.log('Firebase service account key file found at:', firebaseFilePath);
    const raw = fs.readFileSync(firebaseFilePath, 'utf8');

    try {
        firebaseServiceAccount = JSON.parse(raw);
    } catch (error) {
        console.error('Error parsing Firebase service account JSON:', error);
    }
}
let app;
let auth;
if (firebaseAdmin.apps.length === 0 && firebaseServiceAccount !== undefined) {
    app = firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
    });
    auth = getAuth(app);
    console.log('Initialized Firebase Auth');
}

export { app, auth }