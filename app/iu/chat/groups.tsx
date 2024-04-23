"use client"

import { useEffect, useRef, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Image from "next/image";
import { NewGroup } from "./buttons";
import { SetStateAction } from "react";
import { Loading, ThreeDots } from "@/app/lib/icons";
import { DropDownComponent } from "../helpers";


export default function ChatGroup ({group, setGroup}: {
  group: string;
  setGroup: React.Dispatch<SetStateAction<string>>; 
}) {
  const [groupBoxes, setGroupBoxes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "chats/");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let arr = [];
      for (const obj in data) {
        arr.push({...data[obj], obj})
      }
      setLoading(false);
      setGroupBoxes(arr);
    });
  },[]);


  return(
    <section className="h-full min-w-80 rounded-2xl flex flex-col flex-shrink border border-white/40 shadow-xl hover:shadow-white/10 duration-300">
      <header className="flex bg-white/10 h-8 px-5 py-1 mb-3">
        <span className="font-mono">
          Groups
        </span>
        <NewGroup/>
      </header>

      {loading ? <GroupSkeleton/> : (
        (groupBoxes[0] && !loading) ? 
        groupBoxes.map((box: any) => (
          <Group
            key={Math.random()}
            name={box.name}
            picture={box.image}
            isActive={box.name === group}
            setGroup={setGroup}
          />
        )) : (
          <section className="flex py-5 px-4 mx-2 mt-5 bg-white/10 hover:bg-white/15 duration-100">
            <p className="text-2xl text-white/80 font-bold cursor-default">
              Click to add new group! 
            </p>
            <NewGroup/>
          </section>
        )
      )}
    </section>
  )
}

export function Group ({name, picture, isActive, setGroup}: {
  name: string;
  picture: string;
  isActive: boolean;
  setGroup: React.Dispatch<SetStateAction<string>>; 
}) {
  const dropDownRef = useRef<HTMLDivElement>(null);

  const selectGroupHandler = (event: React.MouseEvent<HTMLElement>) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
      setGroup(name);
    }
  }

  return (
    <div className="flex items-center mx-2 my-1 px-3 py-1 rounded-xl gap-4 border-white/15 border cursor-pointer hover:bg-white/5 duration-100 hover:border-white/30"
    onClick={selectGroupHandler}>
      <span className="w-[45px] h-[45px] overflow-hidden flex rounded-full bg-white">
        <Image 
          src={picture ? picture : "/group.png"} 
          alt="User profile picture"
          width={45} 
          height={45} 
        />
      </span>
      <section className="content-center mr-auto">
        <h3 className="text-md">{name}</h3>
      </section>

      {
        isActive && 
        <div className="size-2 bg-cyan-400 rounded-full border-white/20">
        </div>
      }

      <section className="my-auto flex" ref={dropDownRef}>
        <DropDownComponent
          iconContainer_Class="size-5 my-auto"
          icon={<ThreeDots className="fill-white/60 hover:fill-white diration-100 "/>}
        >
        <ul className="w-24 absolute bg-zinc-900 top-5 right-0 border border-white/50 text-right">
          <li className="px-3 py-1 border-b border-white/50 hover:bg-black duration-100">
            <button>
              Rename
            </button>
          </li>
          <li className="px-3 py-1 text-red-500 hover:bg-black  duration-100">
            Delete
          </li>
        </ul>
        </DropDownComponent>
      </section>
    </div>
  )
}

export function GroupSkeleton () {
  return (
    <section className="mx-auto mt-5 flex flex-col gap-2 items-center">
      <div className="size-7">
        <Loading
          className="text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        />
      </div>
      <span className="text-white/60">Loading...</span>
    </section>
  )
}