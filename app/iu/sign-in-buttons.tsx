"use client"

import { GoogleSignIn, GitHubSignIn } from "@/app/lib/auth";
import { GitHubIcon, GoogleIcon } from "../lib/icons";

export function GoogleLogInButton ({className} : {
  className?: string
}) {
  return (
    <button className="group/button rounded-full" 
    onClick={() => GoogleSignIn()}>
      <span className="py-2 px-5 inline-flex gap-5 rounded-full items-center border border-white/40 duration-200 from-white/15 to-white/10 group-hover/button:bg-gradient-to-t group-hover/button:border-white/60 group-hover/button:-translate-y-2">
      Login with Google
      <GoogleIcon
        className={className}
      />
      </span>
    </button>
  )
}

export function GitHubLogInButton ({className} : {
  className?: string
}) {
  return (
    <button className="group/button rounded-full" 
    onClick={() => GitHubSignIn()}>
      <span className=" py-2 px-5 inline-flex gap-5 rounded-full items-center border border-white/40 duration-200 from-white/15 to-white/10 group-hover/button:bg-gradient-to-t group-hover/button:border-white/60 group-hover/button:-translate-y-2">
        Login with Github
      <GitHubIcon
        className={className}
      />
      </span>
    </button>
  )
}