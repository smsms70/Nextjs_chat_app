"use client"

import { GoogleLogInButton, GitHubLogInButton } from "./iu/sign-in-buttons";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { View } from "./lib/icons";

export default function Home() {
  const [user, setUser] = useState(() => auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    console.log("active")
    if (user) {
      console.log("done");
      redirect("/chat");
    } else {
      console.log("not logged")
    }
  },[user]) 

  return (
    <section className="p-5 flex flex-col items-center h-screen justify-center">
      <main className="-mt-32 flex flex-col gap-10">
        <section className="">
          <h1 className="text-[60px] leading-none text-he lg:text-[80px] font-bold bg-gradient-to-t from-gray-300 to-white inline-block text-transparent bg-clip-text">Real-time chat app</h1>
          <p className="max-w-[700px] text-white/80 mt-10">User-friendly, intuitive and fun to use. Send messages with a tap, organize your chats and enjoy the experience. Login to talk with your friends!</p>
        </section>
        <section className="flex flex-col sm:flex-row gap-5">
          <GoogleLogInButton/>
          <GitHubLogInButton/>
          <button className="group/button rounded-full inline-block" >
            <Link
              href={"/chat"}
              className="py-2 px-5 inline-flex gap-5 rounded-full items-center border border-white/40 duration-200 from-white/15 to-white/10 group-hover/button:bg-gradient-to-t group-hover/button:border-white/60 group-hover/button:-translate-y-2"
            >
              View Chat
              <View/>
            </Link>
          </button>
        </section>
      </main>
    </section>
  )
}
