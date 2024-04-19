import UserInfo from "../iu/chat/user";
import ChatGroup from "../iu/chat/groups";
import ChatBox from "../iu/chat/chat";

export default function Home () {


  return (
    <section className="min-h-screen flex justify-center">
      <main className="w-[1100px] min-h-[550px] my-10 p-5 flex gap-10 rounded-xl">
        <section className=" flex flex-col gap-5 ">
          <UserInfo/>
          <ChatGroup/>
        </section>
        <ChatBox/>
      </main>
        
    </section>
  )
}