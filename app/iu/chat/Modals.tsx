"use client"

import { SetStateAction, useRef, useState } from "react";
import { DropDownComponent, Modal } from "../helpers";
import { CreateGroupForm, DeleteGroup, EditGroupForm } from "./forms";
import { AddIcon, EditIcon, ThreeDots } from "@/app/lib/icons";
import { GitHubLogInButton, GoogleLogInButton } from "../sign-in-buttons";

export function CreateGroupsModal ({groupBoxes} : {
  groupBoxes: any[]
}) {
  const [hideModal, setHideModal] = useState<boolean>(false);

  return (
    <Modal
      Icon={<AddIcon 
        className="ml-2 hover:bg-white/10 hover:scale-105 duration-100 rounded-full "/>}
      hideModal={hideModal}
      setHideModal={setHideModal}
    >
      <CreateGroupForm
        groupsArr={groupBoxes}
        setHideModal={setHideModal}
      />
    </Modal>
  )
}

export function UserLoginModal () {
  return (
    <Modal
      Icon={<span className="p-3 mx-auto rounded border border-white/50 hover:bg-white/10 duration-100">Log In</span>}
      className2="p-10"
    >
      <section className="flex flex-col gap-5">
        <p className="text-xl -mt-4 font-bold text-center">Login</p>
        <GoogleLogInButton/>
        <GitHubLogInButton/>
      </section>
    </Modal>
  )
}

export function DropdownEditGroupModal ({name, setGroup, groupObject}: {
  name: string;
  setGroup: React.Dispatch<SetStateAction<string>>; 
  groupObject: any;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  return (
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
  )
}