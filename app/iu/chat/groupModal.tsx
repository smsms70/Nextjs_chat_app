"use client"

import { useRef, useEffect, SetStateAction, useState } from "react";
import { useFormState } from "react-dom";
import { createGroup } from "@/app/lib/actions";

// export function NewGroupBox ({onClose, isVisible, setIsVisible} : {
//   onClose: () => void;
//   isVisible: boolean;
//   setIsVisible: React.Dispatch<SetStateAction<boolean>>;
// }) {

//   const initialState = {message: ""}
//   const [name, setName] = useState<string>('');
//   const [state, formAction] = useFormState(createGroup, initialState);
//   const formRef = useRef<HTMLFormElement>(null);


//   useEffect(() => {
//     const clickOutHandler = (e: MouseEvent) => {
//       if (formRef.current && !formRef.current.contains(e.target as Node) ) {
//         setIsVisible(false)
//       }
//     } 
//     document.addEventListener("mousedown", clickOutHandler);
//     return () => {
//       document.removeEventListener('mousedown', clickOutHandler);
//     };
//   }, [formRef, isVisible])

//   return (
//     <section className="h-lvh w-screen absolute top-0 left-0 backdrop-blur-sm">
//     <form action={formAction} ref={formRef} onSubmit={onClose}
//     className="w-96 flex flex-col absolute bg-zinc-900 rounded-md top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-xl shadow-white/10 border border-white/30">
//       <h3 className="mt-2 mx-auto font-bold text-xl">
//         Create new group
//       </h3>

//       <section className="px-3 pt-2 my-5">
//         <label htmlFor="new-name">
//           name:
//         </label>
//         <input 
//           type="text" 
//           id="newName"
//           name="newName"
//           placeholder="group name"
//           className="ml-2 pl-2 text-black/90 placeholder:font-light focus:outline-0"
//           autoComplete="off"
//           value={name}
//           onChange={(event) => setName(event.target.value)}
//         />
//       </section>


//       <div className="flex justify-end gap-3 mt-auto px-3 pb-4">
//         <button className="border border-white/50 px-4 py-1 rounded-md hover:bg-white/20 duration-100"
//         type="submit"> 
//           New
//         </button>
//         <button  className="px-4 py-1 rounded-md hover:bg-white/20 duration-100"
//         onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </form> 
//   </section>
//   )
// }
