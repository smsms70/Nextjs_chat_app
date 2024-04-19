"use client"

import { auth } from "./auth";
import { getDatabase, ref, set, child, push, update } from "firebase/database";

export const sendMessage = (data: FormDataEntryValue | null) => {

  const db = getDatabase();
  if (!auth.currentUser) return;

  const {displayName, photoURL, uid} = auth.currentUser;

  const message = {
    userID: uid,
    name: displayName,
    photo: photoURL,
    text: data
  }
  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'messsages')).key;
  set(ref(db, 'messages/' + newPostKey), message)


  // const updates: any = [];
  // updates['/messages/' + newPostKey] = message;
  // update(ref(db), updates)
}
