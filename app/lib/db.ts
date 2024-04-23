"use client"

import { auth } from "./auth";
import { getDatabase, ref, set, child, push, update } from "firebase/database";

export const sendMessage = (
  data: FormDataEntryValue | null, 
  group: FormDataEntryValue | null
) => {

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
  set(ref(db, `${group}/` + newPostKey), message)

  console.log("the selected group is: " + group)
  // const updates: any = [];
  // updates['/messages/' + newPostKey] = message;
  // update(ref(db), updates)
}


export const setGroup = (data: FormDataEntryValue | null) => {
  const db = getDatabase();
  if (!auth.currentUser) return;

  const group = {
    name: data
  }
  
  const newPostKey = push(child(ref(db), 'chat')).key;
  set(ref(db, `chats/` + newPostKey), group)
}

export const deleteMessage = () => {
  const db = getDatabase();
  if (!auth.currentUser) return;

  
}