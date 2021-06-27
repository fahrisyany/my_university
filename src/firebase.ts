import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { UserInfo } from "@firebase/auth-types";
import { UserInterface } from "../src/interfaces/user.interface";
import { UniversityInterface } from "../src/interfaces/university.interface";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_FIREBASE_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const authFirebase = firebase.auth();
export const firestore = firebase.firestore();

export const createUserDocument = async (user: UserInfo) => {
  if (await !user) return;
  const userRef = firestore.collection(`users`).doc(user.uid);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    const createUserModel: UserInterface = {
      email: email,
      createdAt: new Date(),
      favorites: [],
    };
    try {
      userRef.set(createUserModel);
    } catch (error) {
      throw error;
    }
  }
};

export const updateUserFavorites = async (
  uid: string,
  payload: UniversityInterface,
) => {
  const { isFavorite } = payload
  if (await !uid) return;
  const userFavoritesRef = firestore.collection(`users`).doc(uid);
  const FieldValue = firebase.firestore.FieldValue

  try {
    await userFavoritesRef.update({
      favorites: isFavorite ? FieldValue.arrayUnion(payload) : FieldValue.arrayRemove({...payload, isFavorite : true})
    })
    return;
  } catch (error) {
    throw error;
  }
};

export const getUserFavorites = async (uid: string):Promise<UniversityInterface[]> => {
  if (await !uid) return [];
  const userFavoritesRef = firestore.collection(`users`).doc(uid);
  const doc: firebase.firestore.DocumentSnapshot = await userFavoritesRef.get()
  if (doc.exists) {
    const favorites = doc?.data()?.favorites;
    return favorites as UniversityInterface[] || [];
  } else {
    return [];
  }
};

export const getUserProfile = async (uid: string):Promise<UserInterface | null> => {
  if (await !uid) return null;
  const userFavoritesRef = firestore.collection(`users`).doc(uid);
  const doc: firebase.firestore.DocumentSnapshot = await userFavoritesRef.get()
  if (doc.exists) {
    const result = {
      favorites:[],
      email:doc?.data()?.email,
      createdAt:doc?.data()?.createdAt.toDate().toDateString(),
    }
    return result as UserInterface;
  } else {
    return null;
  }
};
