import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { AppContext } from './Context/AppContext';

const app = initializeApp({
  apiKey: "AIzaSyDWGZBlPGIMaWAe2fSOElazPVzdC2WTOzY",
  authDomain: "react-chat-ts-9b81f.firebaseapp.com",
  projectId: "react-chat-ts-9b81f",
  storageBucket: "react-chat-ts-9b81f.appspot.com",
  messagingSenderId: "685808830904",
  appId: "1:685808830904:web:4de0cd77d56932916e274d",
  measurementId: "G-3VWZGC3292"
});

const auth = getAuth(app);
const firestore = getFirestore(app)

ReactDOM.render(
  <AppContext.Provider value={{auth, firestore}}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </AppContext.Provider>,
  document.getElementById('root')
);