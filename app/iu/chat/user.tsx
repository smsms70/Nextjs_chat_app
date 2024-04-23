"use client"

import Image from "next/image";
import { GoogleLogInButton, GitHubLogInButton } from "@/app/iu/buttons";
import { DropdownSettings } from "./buttons";
import { Modal } from "../helpers";
import { User } from "firebase/auth";
import { Loading } from "@/app/lib/icons";


export function  UserInfo ({user, loading}: {
  user: User | null;
  loading: boolean
}) {

  const name = (user?.displayName);
  const email = (user?.email);
  const picture = (user?.photoURL);
  
  return (
    <>
    <section className="w-fit min-w-80 px-5 py-2 rounded-3xl flex gap-5 border border-white/40 shadow-lg hover:shadow-white/10 duration-300">
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
        <section className="content-center ">
          <h3 className="text-lg">{name}</h3>
          <p className="text-white/60 text-sm">{email}</p>
        </section> ) : (
        <section className="flex justify-center ml-auto">
          <Modal
            Icon={<span className="p-3 mx-auto border border-white/50 hover:bg-white/10 duration-100">Log In</span>}
            className2="p-10">
            <section className="flex flex-col gap-5">
              <p className="text-xl -mt-4 font-bold text-center">Login</p>
              <GoogleLogInButton/>
              <GitHubLogInButton/>
            </section>
          </Modal>
        </section>
        )
      )}

      { user && !loading && <DropdownSettings/> }

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