"use client"

import Image from "next/image";
import { SendMessageForm } from "./forms";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";

export default function ChatBox ({user, currentGroup}: {
  user: User | null;
  currentGroup: string
}) {
  const [allMessages, setAllMessages] = useState<any>([]);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, `${currentGroup}/`);

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let arr = [];
      for (const obj in data) {
        arr.push({...data[obj], obj})
      }
      setAllMessages(arr)
    });
  },[currentGroup]);

  return (
    <section className="rounded-3xl h-full w-full flex flex-col overflow-hidden border border-white/50 shadow-xl hover:shadow-white/10 duration-300">
      <main className="flex flex-col h-[500px] p-3 overflow-y-scroll "
      id="main-chat-section">        
       {
        allMessages.map((e:any, index: number, arr: any) => 
          (<Message
            key={Math.random()}
            message={e.text}
            sameUser={arr[index - 1]?.userID === e.userID}
            byThisUser={e.userID === user?.uid}
            userName={e.name}
            photo={e.photo}
          />)
        )
       }
      </main>
        <SendMessageForm
          currentGroup= {currentGroup}
        />
    </section>
  )
}

function Message ({message, byThisUser, sameUser, userName, photo} :{
  message: string;
  byThisUser: boolean;
  sameUser: boolean;
  userName: string;
  photo: string;
}) {
  return (
    <div className="flex gap-2">
      {
        !byThisUser && <ImageChat 
          picture={photo}
          sameUser={sameUser}
        />
      }
      <div className={`max-w-[70%] flex flex-col pb-2 pt-1 px-3 rounded-md text-black
      ${sameUser ? 'mt-2' : 'mt-4'}
      ${byThisUser ? 
        'ml-auto rounded-tr-none bg-purple-400' : 
        'mr-auto rounded-tl-none bg-purple-100'
        }`}>
          {/* Title */}
          
        { !sameUser && 
          <p className={`font-semibold  
          ${byThisUser ? 
            'ml-auto text-purple-800' :
            'mr-auto text-zinc-800'}`
            }>{userName}</p> 
        }
          {/* Body */}
        <p className={ `${byThisUser ? '' : ''}` }>
          {message}
        </p>
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