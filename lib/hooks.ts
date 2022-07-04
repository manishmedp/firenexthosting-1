// import { auth, firestore } from "@lib/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe: any;
    if (user) {
      //   const ref = firestore.collection("users").doc(user.uid);
      //   unsubscribe = ref.onSnapshot((doc) => {
      //     setUsername(doc.data()?.username);
      //   });
      const userIdDoc = getDoc(doc(firestore, "users", user.id)).then((doc) => doc.data()); //(collection(firestore, "users", user.id)).then((doc) => doc.data());
      unsubscribe = userIdDoc.then((d) => d);
    } else {
      setUsername(null);
    }
    return unsubscribe;
  }, [user]);

  return { user, username };
}
