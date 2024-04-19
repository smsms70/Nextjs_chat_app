"use client"
import Image from "next/image";
import { useRef, useEffect, SetStateAction, Dispatch } from "react";


export function NewGroupBox ({onClose, isVisible, setIsVisible} : {
  onClose: () => void;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    const clickOutHandler = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node) ) {
        setIsVisible(false)
      }
    } 
    document.addEventListener("mousedown", clickOutHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutHandler);
    };
  }, [formRef, isVisible])

  return (
    <section className="h-lvh w-screen absolute top-0 left-0 backdrop-blur-sm">
    <form className="w-96 flex flex-col absolute bg-zinc-900 rounded-md top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-xl shadow-white/10 border border-white/30" ref={formRef}>
      <h3 className="mt-2 mx-auto font-bold text-xl">
        Create new group
      </h3>

      <section className="px-3 pt-2 mt-5">
        <label htmlFor="new-name">
          name:
        </label>
        <input 
          id="new-name"
          type="text" 
          placeholder="new name"
          defaultValue={""}
          className="ml-2 pl-2 text-black/90 placeholder:font-light focus:outline-0"
        />
      </section>

      <div className="px-3 py-1 mt-3 mb-5">
        <legend className="mb-2">
          Picture: 
        </legend>

        <div className="flex justify-around">
          <OptionImage
            name="User Picture"
            img="/group.png"
            id="groupId"
          />
          <OptionImage
            name="User Picture"
            img="/group/alcohol.png"
            id="drinkId"
          />
          <OptionImage
            name="User Picture"
            img="/group/dog.png"
            id="dogId"
          />
          <OptionImage
            name="User Picture"
            img="/group/science.png"
            id="studyId"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-auto px-3 pb-4">
        <button className="border border-white/50 px-4 py-1 rounded-md hover:bg-white/20 duration-100"> 
          New
        </button>
        <button  className="px-4 py-1 rounded-md hover:bg-white/20 duration-100"
        onClick={onClose}>
          Close
        </button>
      </div>
    </form>
  </section>
  )
}

export function OptionImage ({name, img, id}: {
  name: string;
  img: string;
  id: string;
}) {
  return (
    <div className="flex">
    <label className="" htmlFor={id}>
      <Image 
        src={img} 
        alt={name}
        width={45} 
        height={45} 
        className="border border-white/50 rounded-full p-1 checked:border-black "
      />
    </label>
    <input 
      type="radio"
      id={id}
      name="picture"
      className="group "
      />
    </div>
  )
}