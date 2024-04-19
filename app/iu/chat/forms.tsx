"use client"

import { SendIcon } from "@/app/lib/icons";
import { useState } from "react";
import { useFormState } from "react-dom";
import { createMessage } from "@/app/lib/actions";

export function SendMessageForm () {
  const [newMessage, setNewMessage] = useState<string>("");
  const initialState = {message: ""}

  const [state, formAction] = useFormState(createMessage, initialState);

  return (
    <form action={formAction} className="h-24 py-3 w-full mt-auto flex justify-center gap-2 items-center bg-white/10" 
    onSubmit={() => setNewMessage("")}>
      <input 
        type="text" 
        id="message"
        name="message"
        value={newMessage}
        className="h-[80%] w-full max-w-[500px] pl-4 bg-black rounded-3xl font-light text-white/90 focus:outline-none"
        placeholder="Send Message..."
        onChange={(e) => setNewMessage(e.target.value)}
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