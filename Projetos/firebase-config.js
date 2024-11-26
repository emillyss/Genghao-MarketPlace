import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDTxAUOz9bonb2xbNbwlYyibNNw5cI7rH0",
    authDomain: "genghao-market-place.firebaseapp.com",
    projectId: "genghao-market-place",
    storageBucket: "genghao-market-place.appspot.com",
    messagingSenderId: "832010092652",
    appId: "1:832010092652:web:a959ce6b17f6263ab55849"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
