import ReactDOM from 'react-dom'
import { App } from './App'
import { initializeApp } from "firebase/app";
import { AuthProvider } from './providers/AuthProvider';

initializeApp({
  apiKey: "AIzaSyDWGZBlPGIMaWAe2fSOElazPVzdC2WTOzY",
  authDomain: "react-chat-ts-9b81f.firebaseapp.com",
  projectId: "react-chat-ts-9b81f",
  storageBucket: "react-chat-ts-9b81f.appspot.com",
  messagingSenderId: "685808830904",
  appId: "1:685808830904:web:4de0cd77d56932916e274d",
  measurementId: "G-3VWZGC3292"
});

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);