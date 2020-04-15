import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCemz7lpTzDAkKIzt0SLTCGv2JMyJk0jXI",
  authDomain: "everfab-redo.firebaseapp.com",
  databaseURL: "https://everfab-redo.firebaseio.com",
  projectId: "everfab-redo",
  storageBucket: "everfab-redo.appspot.com",
  messagingSenderId: "875852850939",
  appId: "1:875852850939:web:6546f88ace5ca61844725e",
  measurementId: "G-5MJXX0KM11",
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const storage = firebase.storage();

export function snapshotToArray(snapshot) {
  const updatedArray = [];
  snapshot.forEach((s) => {
    const data = s.data();
    data.id = s.id;
    updatedArray.push(data);
  });
  return updatedArray;
}
