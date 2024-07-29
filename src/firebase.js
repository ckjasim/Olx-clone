import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
// import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCpK_cQYSQWf86jModx3yzlA52O5dJE8DY",
  authDomain: "olx-clone-ff588.firebaseapp.com",
  projectId: "olx-clone-ff588",
  storageBucket: "olx-clone-ff588.appspot.com",
  messagingSenderId: "724972242210",
  appId: "1:724972242210:web:d045563c84f6ddb974917b",
  measurementId: "G-FBFGWCXGMB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);
const storage = getStorage(app)

const signup = async (name, email, password,phone) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      phone
    });
  } catch (error) {
    console.log(error);
    // toast.error(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    // toast.error(error.message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    // toast.error(error.message);
  }
};

export { auth, db,storage, login, signup, logout };
