"use client"

import { DeleteIcon, SendIcon } from "@/app/lib/icons";
import { SetStateAction, useState } from "react";
import { useFormState } from "react-dom";
import { createGroup, createMessage, editGroup } from "@/app/lib/actions";
import { deleteMessage } from "@/app/lib/db";
import { stringify } from "querystring";

export function SendMessageForm ({currentGroup} :{
  currentGroup: string;
}) {
  const [newMessage, setNewMessage] = useState<string>("");
  const initialState = {message: ""};
  const maxLength = 75;

  const [state, formAction] = useFormState(createMessage, initialState);

  const submitHandler = () => {
    setNewMessage("");
  }

  const actionHandler = () => {
    if (!newMessage!.trim()) return alert("Cannot send an empty message! 🤔")
    if (newMessage.length > maxLength) return alert(`Cannot send message longer than ${maxLength} characters! 😥`)
  }
  return (
    <form action={(!newMessage!.trim() || newMessage.length > maxLength) ? actionHandler : formAction} className="h-20 py-3 px-4 w-full mt-auto flex justify-center gap-2 items-center bg-white/10" 
    onSubmit={submitHandler}>
      <span className="font-mono text-sm w-fit">
        {newMessage.length} /{maxLength}
      </span>
      <input 
        type="text" 
        id="message"
        name="message"
        value={newMessage}
        className="h-[80%] w-full max-w-[550px] pl-4 pr-3 mr-auto bg-black rounded-3xl font-light text-white/90 focus:outline-none"
        placeholder="Send Message..."
        autoComplete="off"
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <input 
        type="text" 
        id="currentGroup" 
        name="currentGroup"
        value={currentGroup} 
        onChange={() => currentGroup}
        className="hidden" 
        hidden
      />
      <button 
        type="submit"
        className="border-white/50 border rounded-full h-fit size-10 hover:bg-white/10 group/button"
      >
      <SendIcon
        className="p-2 group-hover/button:translate-x-[2px]  duration-200"
      />
      </button>
    </form>
  )
}



export function CreateGroupForm ({groupsArr, setHideModal} : {
  groupsArr: any[];
  setHideModal: React.Dispatch<SetStateAction<boolean>>
}) {

  const initialState = {message: ""}
  const [name, setName] = useState<string>('');
  const [state, formAction] = useFormState(createGroup, initialState);

  const actionHandler = () => {
    if (groupsArr.some((e) => e.name === name)) return alert("that name is already used 😕")
    if (groupsArr.length > 10) return alert("Cannot add more than 10 groups 😓")
  
  }
  return (
    <form action={(groupsArr.some((e) => e.name === name) || groupsArr.length > 10) ? actionHandler : formAction}
    className="w-96 flex flex-col absolute bg-zinc-900 rounded-md top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-xl shadow-white/10 border border-white/30" onSubmit={() => setHideModal(true)}>
      <h3 className="mt-2 mx-auto font-bold text-xl">
        Create new group
      </h3>

      <section className="px-3 pt-2 my-5">
        <label htmlFor="new-name">
          name:
        </label>
        <input 
          type="text" 
          id="newName"
          name="newName"
          placeholder="group name"
          className="ml-2 pl-2 text-black/90 placeholder:font-light focus:outline-0"
          autoComplete="off"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </section>


      <div className="flex justify-end gap-3 mt-auto px-3 pb-4">
        <button className="border border-white/50 px-4 py-1 rounded-md hover:bg-white/20 duration-100"
        type="submit"> 
          New
        </button>
      </div>
    </form>
  )
}


export function DeleteMessageForm ({id, group} : {
  id: string;
  group: string;
}) {

  const deleteMessageId = () => deleteMessage(id, group);

  return(
    <form action={deleteMessageId}>
      <button>
        <span className="block w-full px-3 py-1 text-red-600 hover:text-red-400 duration-100">
          Delete
        </span>
      </button>
    </form>
  )
}


export function DeleteGroup ({group, setGroup} : {
  group: string;
  setGroup: React.Dispatch<SetStateAction<string>>
}) {

  const deleteGroupId = () => deleteMessage(null, group);
  const submitHandler = () => setGroup("");

  return(
    <form action={deleteGroupId} onSubmit={submitHandler}>
      <button className="px-1 flex text-red-600 hover:text-red-500 duration-200">
        <DeleteIcon/>
        <span className="block w-full px-1 py-1 ">
          Delete
        </span>
      </button>
    </form>
  )
}


export function EditGroupForm ({currentName, groupObject} : {
  currentName: string;
  groupObject: any;
}) {

  const initialState = {
    message: "", 
    oldName: currentName,
    groupData: groupObject,
  }
  const [newName, setNewName] = useState<string>('');
  const [state, formAction] = useFormState(editGroup, initialState);

  const actionHandler = () => {
    if (!newName || !newName.trim()) return alert("The new name cannot be empty 😓")
    if (newName.length > 15) return alert("The new name cannot be longer than 10 characters 😓")
  }
  return (
    <form action={(!newName || !newName.trim() || newName.length > 10) ? actionHandler : formAction}
    className="w-96 flex flex-col absolute bg-zinc-900 rounded-md top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-xl shadow-white/10 border border-white/30">
      <h3 className="mt-2 mx-auto font-bold text-xl">
        Edit Group
      </h3>

      <section className="px-3 pt-2 my-5">
        <label htmlFor="new-name">
          New name:
        </label>
        <input 
          type="text" 
          id="newName"
          name="newName"
          placeholder="group name"
          className="ml-2 pl-2 text-black/90 placeholder:font-light focus:outline-0"
          autoComplete="off"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </section>


      <div className="flex justify-end gap-3 mt-auto px-3 pb-4">
        <button className="border border-white/50 px-4 py-1 rounded-md hover:bg-white/20 duration-100"
        type="submit"> 
          Save
        </button>
      </div>
    </form>
  )
}