// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD5FU6eg_F7ZdGwpRehhsWitGroa2w8xwg',
  authDomain: 'user-email-pass-auth-70754.firebaseapp.com',
  projectId: 'user-email-pass-auth-70754',
  storageBucket: 'user-email-pass-auth-70754.appspot.com',
  messagingSenderId: '968432449307',
  appId: '1:968432449307:web:26b5e055a99a8edcfc85be',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
