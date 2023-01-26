import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { handleError } from "./errorhandlers";

const firebaseConfig = {
  apiKey: "AIzaSyDr2C0-hm9YJxF5JHIvuR3nsJmxlcchfbs",
  authDomain: "instachat-b623c.firebaseapp.com",
  projectId: "instachat-b623c",
  storageBucket: "instachat-b623c.appspot.com",
  messagingSenderId: "204663036134",
  appId: "1:204663036134:web:4c679ac81999b1e4760327",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    return handleError(err);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName: name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    return handleError(err);
  }
};

const getAuthUser = async (uid) => {
  try {
    const usersRef = doc(db, "/users", uid);
    const res = await getDoc(usersRef);
    return res.data();
  } catch (err) {
    console.error(err);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "Password reset link sent!";
  } catch (err) {
    return "No user was found with this email.";
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  getAuthUser,
  logout,
};
