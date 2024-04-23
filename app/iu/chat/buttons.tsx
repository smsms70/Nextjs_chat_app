"use client"

import Image from "next/image";
import { Add } from "@/app/lib/icons";
import { createPortal } from "react-dom";
import { useState, useEffect, useRef } from "react";
import { NewGroupBox } from "./groupModal";
import { SettingsIcon } from "@/app/lib/icons";
import { LogOut } from "@/app/lib/auth";

export function NewGroup () {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-y-hidden")
    } else (
      document.body.classList.remove("overflow-y-hidden")
    )
  },[showModal]);

  return (
    <>
      <button className="ml-auto " 
      onClick={() => setShowModal(!showModal)}>
        <Add
          className="hover:bg-white/10 hover:scale-105 duration-100 rounded-full "
        />
      </button>
      {showModal && createPortal(
        <NewGroupBox
          onClose={() => setShowModal(false)}
          isVisible={showModal}
          setIsVisible={setShowModal}
        />, 
        document.body
      )}
    </>
  )
}


export function DropdownSettings () {
  const [dropdown, showDropdown] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLUListElement>(null);
  const iconRef = useRef<HTMLButtonElement>(null);

  const HandleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
    && iconRef.current && !iconRef.current.contains(event.target as Node)) {
      showDropdown(false);
    }
  } 

  useEffect(() => {
    document.body.addEventListener("mousedown", HandleClickOutside);
    
    return () => {
      document.body.removeEventListener("mousedown", HandleClickOutside);
    }
  },[dropdown, dropdownRef])
  
  return (
    <section className=" ml-auto relative h-8 my-auto">
      <button className="w-8 text-white/80 hover:text-white hover:rotate-12 duration-150 " ref={iconRef}
      onClick={() => showDropdown(!dropdown)}>
        <SettingsIcon/>
      </button>

      {dropdown && (
        <ul className="w-24 absolute bg-zinc-900 button-0 right-0 border border-white/50 text-right" ref={dropdownRef}>
          <li className="px-3 py-1 border-b border-white/50 hover:bg-black duration-100">
          <button onClick={() => {
              showDropdown(false);
            }}>
              altro
            </button>
          </li>
          <li className="px-3 py-1 text-red-500 hover:bg-black  duration-100">
            <button onClick={() => {
              LogOut();
              showDropdown(false);
            }}>
              Log-out
            </button>
          </li>
        </ul>
      )}
    </section>
  )
}

