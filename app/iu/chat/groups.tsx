"use client"

import { useEffect, useRef, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Image from "next/image";
import { SetStateAction } from "react";
import { Add, EditIcon, Loading, ThreeDots } from "@/app/lib/icons";
import { DropDownComponent, Modal } from "../helpers";
import { CrateGroupForm, DeleteGroup, EditGroupForm } from "./forms";


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
  
  const debuggingHandler = () => {
    // console.log(groupObject[group])
  }
  return(
    <section className="h-full min-w-80 max-h-[400px] rounded-2xl flex flex-col flex-shrink border border-white/40 shadow-xl hover:shadow-white/10 duration-300 overflow-hidden" onClick={debuggingHandler}>
      <header className="flex bg-white/10 h-8 px-5 py-1">
        <span className="font-mono">
          Groups
        </span>
        <Modal
          Icon={<Add 
            className="hover:bg-white/10 hover:scale-105 duration-100 rounded-full "/>}
        >
          <CrateGroupForm
            groupsArr={groupBoxes}
          />
        </Modal>
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
              groupBoxes={groupBoxes}
              groupObject={groupObject[group]}
            />
          ))} 
        </main>
        )
      }
    </section>
  )
}

function Group ({name, picture, isActive, setGroup, groupBoxes, groupObject}: {
  name: string;
  picture: string;
  isActive: boolean;
  setGroup: React.Dispatch<SetStateAction<string>>; 
  groupBoxes: any[];
  groupObject: any;
}) {
  const dropDownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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
          ref={modalRef}
        >
        <ul className="absolute bg-zinc-900 top-5 right-0 border border-white/50 text-right" >
          <li className="border-b border-white/50 hover:bg-black duration-100">
            <Modal
              Icon={
                <>
                  <EditIcon/>
                  <span className="block w-full px-2 py-1">
                    Edit
                  </span>
                </>
              }
              parentIconClassName="w-full px-1 flex text-white/80 hover:text-white duration-200"
              ref={modalRef}
            >
              <EditGroupForm
                currentName={name}
                groupObject={groupObject}
              />
            </Modal>
          </li>
          <li className="hover:bg-black  duration-100">
            <DeleteGroup
              group={name}
              setGroup={setGroup}
            />
          </li>
        </ul>
        </DropDownComponent>
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
      <Modal
        Icon={<Add 
          className="hover:bg-white/10 hover:scale-105 duration-100 rounded-full "/>}
      >
        <CrateGroupForm
          groupsArr={groupBoxes}
        />
      </Modal>
    </section>
  )
}
