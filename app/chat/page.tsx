"use client"

import { useState, useEffect, useContext } from "react";
import { auth } from "@/app/lib/auth";
import { UserInfo, UserSkeleton } from "../iu/chat/user";
import ChatGroup from "../iu/chat/groups";
import ChatBox from "../iu/chat/chat";
import { View } from "../lib/icons";

export default function Home () {
  const [user, setUser] = useState(() => auth.currentUser);
  const [loading, setloading] = useState<boolean>(true);
  const [currentGroup, setCurrentGroup] = useState<string>("");

  useEffect(() => {
    const groupSelected = (localStorage.getItem("groupSelected") || "");
    setCurrentGroup(groupSelected);

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
    if (currentGroup) {
      localStorage.setItem("groupSelected", currentGroup);
    }
  },[currentGroup])
  

  return (
    <section className="min-h-screen flex justify-center">
      { !loading && !user && 
        <div className="py-2 px-4 flex gap-5 items-center text-black bg-gray-300/90 fixed bottom-14 md:bottom-14 md:right-10 text-xl font-semibold z-50 font-mono"> 
          View mode
          <View/>
        </div>
      }
      <main className="w-[1100px] min-h-[550px] my-10 p-2 flex flex-col md:flex-row gap-10 rounded-xl">
        <section className=" flex flex-col items-center gap-5 ">
          <UserInfo
            user={user}
            loading={loading}
          />
          <ChatGroup
            group={currentGroup}
            setGroup={setCurrentGroup}
          />
        </section>
        <ChatBox
          user={user}
          currentGroup={currentGroup}
          loading={loading}
        />
      </main>
    </section>
  )
}