"use client"

import { useState, useEffect, useContext } from "react";
import { auth } from "@/app/lib/auth";
import { UserInfo, UserSkeleton } from "../iu/chat/user";
import ChatGroup, { GroupSkeleton } from "../iu/chat/groups";
import ChatBox from "../iu/chat/chat";


export default function Home () {
  const [user, setUser] = useState(() => auth.currentUser);
  const [loading, setloading] = useState<boolean>(true);
  const [messagesGroup, setMessagesGroup] = useState<string>("");

  useEffect(() => {
    const groupSelected = (localStorage.getItem("groupSelected") || "");
    setMessagesGroup(groupSelected);

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setloading(false);
    });
  },[])
  
  useEffect(() => {
    if (messagesGroup) {
      localStorage.setItem("groupSelected", messagesGroup);
    }
    console.log(messagesGroup)
  },[messagesGroup])


  return (
    <section className="min-h-screen flex justify-center">
      <main className="w-[1100px] min-h-[550px] my-10 p-2 flex flex-col md:flex-row gap-10 rounded-xl">
        <section className=" flex flex-col items-center gap-5 ">
          <UserInfo
            user={user}
            loading={loading}
          />
          <ChatGroup
            group={messagesGroup}
            setGroup={setMessagesGroup}
          />
        </section>
        <ChatBox
          user={user}
          currentGroup={messagesGroup}
          loading={loading}
        />
      </main>
    </section>
  )
}