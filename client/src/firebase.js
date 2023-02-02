import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
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

const getUserById = async (uid) => {
  try {
    const usersRef = doc(db, "/users", uid);
    const res = await getDoc(usersRef);
    return res.data();
  } catch (err) {
    console.error(err);
  }
};

async function addFriend(userId, friendId) {
  if (userId !== friendId) {
    const userRef = doc(db, "/users", userId);
    const userDoc = await getDoc(userRef);

    const friendRef = doc(db, "/users", friendId);
    const friendDoc = await getDoc(friendRef);
    // If the user's document does not exist, return an error
    if (!userDoc.exists || !friendDoc.exists) {
      throw new Error(`User with ID ${userId} does not exist`);
    }

    const friendsList = userDoc.data().friends;
    const data = userDoc.data();

    const friendsListFriend = friendDoc.data().friends;
    const dataTwo = friendDoc.data();

    if (!friendsList) {
      const { authProvider, displayName, email, uid } = data;
      await setDoc(doc(db, "users", userId), {
        authProvider,
        displayName,
        email,
        friends: [friendId],
        uid,
      })
        .then(() => console.log("success"))
        .catch((err) => console.log(err));
    } else {
      const { authProvider, displayName, email, uid } = data;
      friendsList.push(friendId);
      await setDoc(doc(db, "users", userId), {
        authProvider,
        displayName,
        email,
        friends: friendsList,
        uid,
      })
        .then(() => console.log("success"))
        .catch((err) => console.log(err));
    }

    if (!friendsListFriend) {
      const { authProvider, displayName, email, uid } = dataTwo;
      await setDoc(doc(db, "users", friendId), {
        authProvider,
        displayName,
        email,
        friends: [userId],
        uid,
      })
        .then(() => console.log("success"))
        .catch((err) => console.log(err));
    } else {
      const { authProvider, displayName, email, uid } = dataTwo;
      friendsListFriend.push(userId);
      await setDoc(doc(db, "users", friendId), {
        authProvider,
        displayName,
        email,
        friends: friendsListFriend,
        uid,
      })
        .then(() => console.log("success"))
        .catch((err) => console.log(err));
    }
  } else return { message: "Error same person" };
}

async function getFriends(uid) {
  const userRef = doc(db, "/users", uid);
  const userDoc = await getDoc(userRef);
  if (!userDoc.exists) {
    throw new Error(`User with ID ${uid} does not exist`);
  }
  return userDoc.data().friends;
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "Password reset link sent!";
  } catch (err) {
    return "No user was found with this email.";
  }
};

const sendMessage = async (senderId, recipientId, content) => {
  try {
    const messageRef = doc(collection(db, "messages"));

    await setDoc(messageRef, {
      senderId,
      recipientId,
      content,
      timestamp: Date.now(),
    }).then(() => console.log("success"));
  } catch (error) {
    console.log(error);
  }
};

const getMessages = async (ownId, friendId) => {
  const messages = [];
  try {
    const myMessagestoFriend = query(
      collection(db, "messages"),
      where("senderId", "==", ownId),
      where("recipientId", "==", friendId)
    );
    const friendMessagetoMe = query(
      collection(db, "messages"),
      where("senderId", "==", friendId),
      where("recipientId", "==", ownId)
    );

    const querySnapshot = await getDocs(myMessagestoFriend);
    const querySnapshotT = await getDocs(friendMessagetoMe);

    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
    });
    querySnapshotT.forEach((doc) => {
      messages.push(doc.data());
    });
    messages.sort((a, b) => a.timestamp - b.timestamp);
    return messages;
  } catch (error) {
    console.log(error);
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
  getUserById,
  addFriend,
  getFriends,
  sendMessage,
  getMessages,
  logout,
};
