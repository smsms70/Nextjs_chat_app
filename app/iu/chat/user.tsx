"use client"

import Image from "next/image";
import { DropDownComponent } from "../helpers";
import { User } from "firebase/auth";
import { Loading, SettingsIcon } from "@/app/lib/icons";
import { LogOut } from "@/app/lib/auth";
import { UserLoginModal } from "./Modals";

export function  UserInfo ({user, loading}: {
  user: User | null;
  loading: boolean
}) {

  const name = (user?.displayName);
  const email = (user?.email);
  const picture = (user?.photoURL);
  
  return (
    <>
    <section className="w-fit min-w-80 px-4 py-2 rounded-3xl flex border border-white/40 shadow-lg hover:shadow-white/10 duration-300">
      {!loading && (
        <span className="size-[45px] rounded-full my-auto bg-white">
          <Image 
            src={picture ? picture : "/user.png"} 
            alt="User profile picture"
            className="rounded-full"
            width={45} 
            height={45} 
          />
        </span> 
      )}

      {loading ? <UserSkeleton/> : ( 
        user ? (
        <section className="content-center mx-4">
          <h3 className="text-lg">{name}</h3>
          <p className="text-white/60 text-sm">{email}</p>
        </section> ) : (
        <section className="flex justify-center ml-auto">
          <UserLoginModal/>
        </section>
        )
      )}

      { user && !loading && 
      <DropDownComponent
        icon={
          <SettingsIcon className="w-8 text-white/80 hover:text-white hover:rotate-12 duration-150"/>
        }
      >
        <ul className="w-24 absolute bg-zinc-900 top-full right-0 border border-white/50 text-right">
          <li className="px-3 py-1 text-red-500 cursor-pointer hover:bg-black duration-100" onClick={() => LogOut()}>
            Log-out
          </li>
        </ul>
      </DropDownComponent> }

    </section>
    </>
  )
}

export function UserSkeleton () {
  return (
    <section className="flex w-full">
      <span className="size-[45px] rounded-full bg-white/80 animate-pulse">
      </span>
      <section className="content-center size-8 my-auto mx-auto ">
        <Loading
          className="text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        />
      </section>
    </section>
  )
}