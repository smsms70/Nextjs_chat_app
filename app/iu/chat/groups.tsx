"use client"

import { useEffect, useRef, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Image from "next/image";
import { SetStateAction } from "react";
import { Loading } from "@/app/lib/icons";
import { CreateGroupsModal, DropdownEditGroupModal } from "./Modals";


export default function ChatGroup ({group, setGroup}: {
  group: string;
  setGroup: React.Dispatch<SetStateAction<string>>; 
}) {
  const [groupBoxes, setGroupBoxes] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [needData, setNeedData] = useState<boolean>(false);
  const [groupObject, setGroupObject] = useState<any>({});

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let arr = [];
      let newArr = [];

      for (const obj in data) {
        arr.push({...data[obj]})
      }

      if (!arr[0]) {
        setNeedData(true);
        setLoading(false);
        return
      }
      for (let i = 0; i < arr.length; i++) {
        const data2 = arr[i];
        for (const obj in data2) {
          newArr.push({...data2[obj].config})
        }
        setGroupObject(data2)
      }

      setLoading(false);
      setNeedData(false);
      setGroupBoxes(newArr);
    });
  },[]);
  
  return(
    <section className="h-full min-w-80 max-h-[400px] rounded-2xl flex flex-col flex-shrink border border-white/40 shadow-xl hover:shadow-white/10 duration-300 overflow-hidden">
      <header className="flex bg-white/10 h-8 px-5 py-1">
        <span className="font-mono">
          Groups
        </span>
        <CreateGroupsModal
          groupBoxes={groupBoxes}
        />
      </header>

        {/* Body Handlers */}
      {loading ? <GroupSkeleton/> :
        (needData && !loading) ? 
          <GroupEmptyCase
            groupBoxes={groupBoxes}
          />
        : (
          // body
        <main className="h-full overflow-y-scroll" id="cool-scroll">
          {groupBoxes.map((box: any) => (
            <Group
              key={Math.random()}
              name={box.name}
              picture={box.image}
              isActive={box.name === group}
              setGroup={setGroup}
              groupObject={groupObject[group]}
            />
          ))} 
        </main>
        )
      }
    </section>
  )
}

function Group ({name, picture, isActive, setGroup, groupObject}: {
  name: string;
  picture: string;
  isActive: boolean;
  setGroup: React.Dispatch<SetStateAction<string>>; 
  groupObject: any;
}) {
  
  const selectGroupHandler = () => {
    setGroup(name);
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

      <section className="my-auto flex">
        <DropdownEditGroupModal
          name={name}
          groupObject={groupObject}
          setGroup={setGroup}
        />
      </section>
    </div>
  )
}

function GroupSkeleton () {
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

function GroupEmptyCase ({groupBoxes} : {
  groupBoxes: any[]
}) {

  return (
    <section className="flex py-5 px-4 mx-2 mt-5 bg-white/10 hover:bg-white/15 duration-100">
      <p className="text-2xl text-white/80 font-bold cursor-default">
        Click to add new group! 
      </p>
      <CreateGroupsModal
        groupBoxes={groupBoxes}
      />
    </section>
  )
}
