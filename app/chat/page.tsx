"use client"

import { useState, useEffect, useContext } from "react";
import { auth } from "@/app/lib/auth";
import UserInfo from "../iu/chat/user";
import ChatGroup from "../iu/chat/groups";
import ChatBox from "../iu/chat/chat";

export default function Home () {
  const [user, setUser] = useState(() => auth.currentUser);
  const [messagesGroup, setMessagesGroup] = useState<string>('123');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  },[])

  
  return (
    <section className="min-h-screen flex justify-center">
      <main className="w-[1100px] min-h-[550px] my-10 p-5 flex gap-10 rounded-xl">
        <section className=" flex flex-col gap-5 ">
          <UserInfo
            user={user}
          />
          <ChatGroup
            setGroup={setMessagesGroup}
          />
        </section>
        <ChatBox
          user={user}
          currentGroup={messagesGroup}
        />
      </main>
    </section>
  )
}