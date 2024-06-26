"use client"

import Image from "next/image";
import { DeleteMessageForm, SendMessageForm } from "./forms";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect, useRef } from "react";
import { User } from "firebase/auth";
import { Loading, ThreeDots } from "@/app/lib/icons";
import { DropDownComponent } from "../helpers";

export default function ChatBox ({user, currentGroup, loading}: {
  user: User | null;
  currentGroup: string;
  loading: boolean;
}) {
  const [allMessages, setAllMessages] = useState<any>([]);
  const [chatLoaging, setChatLoading] = useState<boolean>(true);
  const [messagesId, setMessagesId] = useState<any>([]);

  useEffect(() => {
    if (!currentGroup) return setChatLoading(false);

    const db = getDatabase();
    const starCountRef = ref(db, `chat/${currentGroup}/`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let arr = [];
      let arrId = [];

      for (const obj in data) {
        if (obj !== "config") {
          arr.push({...data[obj], obj});
          arrId.push(obj);
        }
      }
      setChatLoading(false);
      setAllMessages(arr);
      setMessagesId(arrId);
    });
  },[currentGroup]);

  const debuggingHandler = () => {
    
  }

  return (
    <section className="rounded-3xl h-dvh md:h-full w-full flex flex-col overflow-hidden border border-white/50 shadow-xl hover:shadow-white/10 duration-300" onClick={debuggingHandler}>

      {chatLoaging ? <ChatSkeleton/> : (
        <main className="flex flex-col h-full md:h-[450px] p-1 md:px-3 md:pt-3 overflow-y-scroll "
        id="cool-scroll">        
          {!currentGroup && (
            <section className="py-5 px-4 mx-auto my-auto bg-white/10">
              <p className="text-3xl text-white/70 font-bold">
                Select a new group to start the chat!
              </p>
            </section>
          )}

          {(currentGroup && !allMessages[0]) && (
            <section className="py-2 px-4 mx-auto my-auto bg-white/10">
              <p className="text-xl text-white/90 font-bold">
                chat empty 😓 send a new message
              </p>
            </section>
          )}

          {(currentGroup && allMessages[0]) && (
            allMessages.map((e:any, index: number, arr: any) => 
              (<Message
                key={Math.random()}
                message={e.text}
                sameUser={arr[index - 1]?.userID === e.userID}
                byThisUser={e.userID === user?.uid}
                userName={e.name}
                photo={e.photo}
                isLast={index === arr.length - 1}
                currentGroup={currentGroup}
                messageId={messagesId[index]}/>
              )
            )
          )}
        </main>
      )}

        {!loading && !chatLoaging && (
          <SendMessageForm
            currentGroup= {currentGroup}
          />
        )}
    </section>
  )
}

function Message ({message, byThisUser, sameUser, userName, photo, isLast, currentGroup, messageId } :{
  message: string;
  byThisUser: boolean;
  sameUser: boolean;
  userName: string;
  photo: string;
  isLast: boolean;
  currentGroup: string;
  messageId: string;
}) {
  const [visible, setVisible] = useState<boolean>(false);
  const messageBoxRef = useRef<HTMLDivElement>(null);

  const closeHandler = () => {
    if (!visible) return;
    setVisible(false);
  }

  useEffect(() => {
    if (messageBoxRef.current && isLast) {
      messageBoxRef.current.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }
  },[])


  return (
    <div className="flex gap-1 md:gap-2 relative group/text" ref={messageBoxRef}>
      {
        !byThisUser && <ImageChat 
          picture={photo}
          sameUser={sameUser}
        />
      }
      {/* Body */}
      <div className={`max-w-[70%] flex flex-col pb-2 pt-1 px-3 rounded-md text-black relative break-words
      ${sameUser ? 'mt-2' : 'mt-4'}
      ${byThisUser ? 
        'ml-auto rounded-tr-none bg-purple-400' : 
        'mr-auto rounded-tl-none bg-purple-100'}`
      }>
        {/* Title */}
          
        { !sameUser && 
          <p className={`font-semibold  
          ${byThisUser ? 
          'ml-auto text-purple-800' :
          'mr-auto text-zinc-800'}`}>
            {userName}
          </p> 
        }
          {/* Text */}
        <p className={ `${byThisUser ? '' : ''}` }>
          {message}
        </p>

      <section className={`absolute bottom-1 flex hover:visible group-hover/text:visible 
      ${!byThisUser ? "-right-7" : "-left-7"} 
      ${visible ? "visible" : "invisible"}` }
      onClick={() => setVisible(!visible)}
      >
        <DropDownComponent
        iconContainer_Class="size-5 my-auto"
        icon={<ThreeDots className="fill-white/60 hover:fill-white diration-100"/>}
        // func={closeHandler}
        >
          <ul className={`absolute bg-zinc-900 top-5 border border-white/50 z-50 ${!byThisUser ? "left-0" : "right-5"}`} >
            <li>
              <DeleteMessageForm
                id={messageId}
                group={currentGroup}
              />
            </li>
          </ul>
        </DropDownComponent>
      </section>

      </div>
      {
        byThisUser && <ImageChat 
          picture={photo}
          sameUser={sameUser}
        />
      }
    </div>
  )
}

function ImageChat ({picture, sameUser} : {
  picture: string;
  sameUser: boolean;
}) {
  return (
    <span className={`w-[35px] h-[35px] mx-1 mt-2 overflow-hidden flex rounded-full bg-white ${ sameUser && 'invisible' }`}>
      <Image 
        src={picture} 
        alt="User profile picture"
        width={35} 
        height={35} 
      />
    </span>
  )
}

function ChatSkeleton () {
  return (
    <section className="my-auto mx-auto flex gap-5">
      <div className="size-8">
        <Loading
          className="text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        />
      </div>
      <span className="text-white/60 my-auto">Loading...</span>
    </section>
  )
}

