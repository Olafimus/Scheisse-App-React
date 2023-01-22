import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { userData } from "../../components/vocabData/vocabData";

const firebaseConfig = {
  apiKey: "AIzaSyDJ4oBGl3SRrN0uAV6mVjk7Ka7ICE7xW7g",
  authDomain: "vocab-app-3c50a.firebaseapp.com",
  projectId: "vocab-app-3c50a",
  storageBucket: "vocab-app-3c50a.appspot.com",
  messagingSenderId: "911931013688",
  appId: "1:911931013688:web:590a6bae6da0bdf6be44cd",
  measurementId: "G-DPNE3539TN",
  databaseURL: "https://vocab-app-3c50a-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const vocab = [];

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        vocab,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getUserVocabs = async (id) => {
  const userDoc = doc(db, "users", id);
  const docSnap = await getDoc(userDoc);
  const vocabs = docSnap.data().vocab;

  userData = vocabs;
};
