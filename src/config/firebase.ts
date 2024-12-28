import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB1b_bEGq0UGw3vaXNTcoaCktm1DtThlgk",
  authDomain: "treasurehunt-1d4f8.firebaseapp.com",
  databaseURL: "https://treasurehunt-1d4f8-default-rtdb.firebaseio.com",
  projectId: "treasurehunt-1d4f8",
  storageBucket: "treasurehunt-1d4f8.firebasestorage.app",
  messagingSenderId: "800375525379",
  appId: "1:800375525379:web:3008bf7292e9b1c294be36",
  measurementId: "G-C9EBWEPVLT"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);