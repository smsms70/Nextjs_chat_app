"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { GoogleLogInButton, GitHubLogInButton } from "@/app/iu/buttons";
import { DropdownSettings } from "./buttons";
import { auth } from "@/app/lib/auth";
import { Modal } from "../helpers";

export default function  UserInfo () {
  const [user, setUser] = useState(() => auth.currentUser);
  const [loading, setLoading] = useState<boolean>(true);

  const name = (user?.displayName);
  const email = (user?.email);
  const picture = (user?.photoURL);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  
  return (
    <>{
    !loading ?
    <section className="w-fit min-w-80 px-5 py-2 rounded-3xl flex gap-5 border border-white/40 shadow-lg hover:shadow-white/10 duration-300">
      <span className="w-[55px] overflow-hidden flex rounded-full bg-white">
        <Image 
          src={picture ? picture : "/user.png"} 
          alt="User profile picture"
          width={55} 
          height={55} 
        />
      </span>

      {user ? 
        <section className="content-center ">
          <h3 className="text-xl">{name}</h3>
          <p className="text-white/60">{email}</p>
        </section> : 
    
        <section className="flex justify-center ml-auto">
          <Modal
            Icon={<span className="p-3 mx-auto border border-white/50 hover:bg-white/10 duration-100">Log In</span>}
            className2="p-10"
          >
            <section className="flex flex-col gap-5">
              <p className="text-xl -mt-4 font-bold text-center">Login</p>
              <GoogleLogInButton/>
              <GitHubLogInButton/>
            </section>
          </Modal>
        </section>
      }

      { user && <DropdownSettings/> }

    </section> :
    ''
    }</>
  )
}