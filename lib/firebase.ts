import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs, getFirestore, limit, query, Timestamp, where } from "firebase/firestore";
import { getStorage, TaskEvent } from "firebase/storage";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCusZmu6hjNk7RcoB4vQXbTAVRIE01SCP0",
  authDomain: "mscribe-medpiper.firebaseapp.com",
  projectId: "mscribe-medpiper",
  storageBucket: "mscribe-medpiper.appspot.com",
  messagingSenderId: "492087719966",
  appId: "1:492087719966:web:7d82406d59aa97a94c560f",
  measurementId: "G-DY5K5TXP1G",
};

// const firebase = {
//   app: getApp(),
//   apps: getApps(),
//   initializeApp: (x) => initializeApp(x),
//   storage: getStorage(),
//   auth: () => getAuth(getApp()),
//   firestore: () => getFirestore(getApp()),
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

export const app = initializeApp(firebaseConfig);

// Auth exports
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore = getFirestore(app);
// export const serverTimestamp = firestore.FieldValue.serverTimestamp;
export const fromMillis = Timestamp.fromMillis;
// export const increment = firestore.FieldValue.increment;

// Storage exports
export const storage = getStorage(app);
export const STATE_CHANGED: TaskEvent = "state_changed";

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = collection(firestore, "users");
  //   const query = usersRef.where("username", "==", username).limit(1);
  const q = query(usersRef, where("username", "==", username), limit(1)); //.limit(1);
  //   const userDoc = (await q.get()).docs[0];
  const userDoc = await (await getDocs(q)).forEach((doc) => doc.data())[0]; //.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
