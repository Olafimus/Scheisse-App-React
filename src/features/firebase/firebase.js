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
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import { Match } from "../match-details/match-details";

const firebaseConfig = {
  apiKey: "AIzaSyA9oSr0qJRPwLz3eqqV8WDsk4XQJjl53Ks",
  authDomain: "scheisse-app.firebaseapp.com",
  projectId: "scheisse-app",
  storageBucket: "scheisse-app.appspot.com",
  messagingSenderId: "477289505743",
  appId: "1:477289505743:web:2c733bed870c986c4468ba",
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

export const usersCollectionRef = collection(db, "users");

export const matchCollectionRef = collection(db, "matches");

export const addMatch = async ({
  matchPlayers,
  roundNumber,
  finished,
  giver,
  id,
}) =>
  await addDoc(matchCollectionRef, {
    matchPlayers,
    roundNumber,
    finished,
    giver,
    id,
  });

export const updateMatch = async (
  matchRef,
  { matchPlayers, roundNumber, finished, giver, id }
) => {
  const matchDocRef = doc(db, "matches", matchRef);
  await updateDoc(matchDocRef, {
    matchPlayers,
    roundNumber,
    finished,
    giver,
    id,
  });
};

export const getMatches = async () => {
  const data = await getDocs(matchCollectionRef);
  const matches = data.docs.map((doc) => ({
    ...doc.data(),
    matchRef: doc.id,
  }));
  return matches;
};

export const createUser = async (name, id) => {
  const matches = [];
  await addDoc(usersCollectionRef, { name, id, matches });
};

export const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
