"use client"

import { GoogleLogInButton, GitHubLogInButton } from "./iu/buttons";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { auth } from "@/app/lib/auth";


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
    <section className="flex flex-col items-center h-screen justify-center">
      <main className="-mt-32 flex flex-col gap-10">
        <section className="">
          <h1 className="lg:text-[80px] font-bold">Real-time chat app</h1>
          <p className="text-white/80">User-friendly, intuitive and fun to use. Send messages with a tap, organize your chats, <br /> and enjoy the experience. Login to talk with your friends!</p>
        </section>
        <section className="flex gap-5">
          <GoogleLogInButton/>
          <GitHubLogInButton/>
        </section>
      </main>
    </section>
  )
}
