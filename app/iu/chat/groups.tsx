import { UserInter } from "@/app/lib/types";
import Image from "next/image";
import { NewGroup } from "./buttons";

export default function ChatGroup () {
  return(
    <section className="h-full rounded-3xl flex flex-col border border-white/40 overflow-hidden shadow-xl hover:shadow-white/10 duration-300">
      <header className="flex bg-white/10 h-8 px-5 py-1 mb-3">
        <span className="">
          Chat Groups
        </span>
        <NewGroup/>
      </header>
      
      <Group
        name={"Lorem2"}
        picture={null}
      />
      {/* <footer className="bg-white/40 mt-auto h-16">

      </footer> */}
    </section>
  )
}

export function Group ({name, picture}: {
  name: string;
  picture: string | null;
}) {
  return (
    <div className="flex mx-2 my-1 px-3 py-1 rounded-2xl gap-4 border-white/15 border cursor-pointer hover:bg-white/5 duration-100 hover:border-white/30">
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