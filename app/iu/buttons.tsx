"use client"

import { GoogleSignIn } from "@/app/lib/auth";

export function GoogleLogInButton () {
  return (
    <button className="group/button rounded-full" 
    onClick={() => GoogleSignIn()}>
      <span className="py-2 px-5 block rounded-full border border-white/40 duration-200 from-white/15 to-white/10 group-hover/button:bg-gradient-to-t group-hover/button:border-white/60 group-hover/button:-translate-y-2">
      Login with Google
      </span>
    </button>
  )
}

export function GitHubLogInButton () {
  return (
    <button className="group/button rounded-full" 
    onClick={() => console.log('clicked')}>
      <span className="py-2 px-5 block rounded-full border border-white/40 duration-200 from-white/15 to-white/10 group-hover/button:bg-gradient-to-t group-hover/button:border-white/60 group-hover/button:-translate-y-2">
        Login with Github
      </span>
    </button>
  )
}