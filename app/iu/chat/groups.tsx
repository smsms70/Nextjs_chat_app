"use client"

import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Image from "next/image";
import { NewGroup } from "./buttons";
import { SetStateAction } from "react";

export default function ChatGroup ({setGroup}: {
  setGroup: React.Dispatch<SetStateAction<string>>; 
}) {
  const [groupBoxes, setGroupBoxes] = useState<any>([]);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "chats/");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let arr = [];
      for (const obj in data) {
        arr.push({...data[obj], obj})
      }
      setGroupBoxes(arr)
    });
  },[]);

  return(
    <section className="h-full rounded-3xl flex flex-col border border-white/40 overflow-hidden shadow-xl hover:shadow-white/10 duration-300">
      <header className="flex bg-white/10 h-8 px-5 py-1 mb-3">
        <span className="">
          Chat Groups
        </span>
        <NewGroup/>
      </header>
      {
        groupBoxes.map((box: any) => (
          <Group
            key={Math.random()}
            name={box.name}
            picture={box.image}
            setGroup={setGroup}
          />
        ))
      }
      {/* <footer className="bg-white/40 mt-auto h-16">

      </footer> */}
    </section>
  )
}

export function Group ({name, picture, setGroup}: {
  name: string;
  picture: string
  setGroup: React.Dispatch<SetStateAction<string>>; 
}) {

  const selectGroupHandler = () => {
    setGroup(name)
  }
  return (
    <div className="flex mx-2 my-1 px-3 py-1 rounded-2xl gap-4 border-white/15 border cursor-pointer hover:bg-white/5 duration-100 hover:border-white/30"
    onClick={selectGroupHandler}>
      <span className="w-[45px] h-[45px] overflow-hidden flex rounded-full bg-white">
        <Image 
          src={picture ? picture : "/group.png"} 
          alt="User profile picture"
          width={45} 
          height={45} 
        />
      </span>
      <section className="content-center ">
        <h3 className="text-md">{name}</h3>
      </section>
    </div>
  )
}