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
  set(ref(db, `chat/${group}/` + newPostKey), message)

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
  const config = {
    name: data || "New group",
    type: "public",
    style: "default",
    admin: "none",
  }
  // const newPostKey = push(child(ref(db), 'chat')).key;
  set(ref(db, `chat/${data || "New group"}/config`), config)
}


export  const deleteMessage = async (id: string | null, group: string) => {
  const db = getDatabase();
  if (!auth.currentUser) return;
  

  set(ref(db, `chat/${group}/` + (id || '')), null)
}

export const EditGroup = (newName: FormDataEntryValue | null, oldName: string, groupData: any) => {
  const db = getDatabase();
  if (!auth.currentUser) return;

  groupData.config.name = newName;
  
  set(ref(db, `chat/${newName || "New group"}`), groupData)
  set(ref(db, `chat/${oldName}/`), null)
}