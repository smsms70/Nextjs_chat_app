"use client"

import { getDatabase, onValue, ref } from "firebase/database";
import { useRef, useEffect, useState, forwardRef, SetStateAction } from "react";
import { createPortal } from "react-dom";


export const Modal = forwardRef(function Modal({children, Icon, className2, parentIconClassName, hideModal, setHideModal} : {
  children: JSX.Element;
  Icon: JSX.Element;
  parentIconClassName?: string;
  className2?: string;
  hideModal?: boolean;
  setHideModal?: React.Dispatch<SetStateAction<boolean>>;
}, ref: any) {
  const [showModal, setShowModal] = useState(false);
  const refProp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showModal && !ref) {
      document.body.classList.add("overflow-y-hidden")
    } else (
      document.body.classList.remove("overflow-y-hidden")
    )
  },[showModal]);

  useEffect(() => {
    const clickOutHandler = (e: MouseEvent) => {
      if (refProp && refProp.current && !refProp.current.contains(e.target as Node) ) {
        setShowModal(false);
      }
    } 
    document.addEventListener("mousedown", clickOutHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutHandler);
    };
  }, [refProp, showModal])

  useEffect(() => {
    if (hideModal) {
      setShowModal(false);
      setHideModal!(false);
    }
  },[hideModal]);

  return (
    <>
      <button className={parentIconClassName}
      onClick={() => setShowModal(!showModal)}>
        {Icon}
      </button>

      {showModal && createPortal(
        <BlurBackgroundModal
          className2={className2}
          ref={ref ? ref : refProp}
        >
            {children}
        </BlurBackgroundModal>, 
        document.body
      )}

    </>
  )
})

const BlurBackgroundModal = forwardRef(function BlurBackgroundModal({children, className2} : {
  children: JSX.Element;
  className2?: string;
}, ref : any) {

  return (
    <section className="h-screen w-screen absolute top-0 left-0 backdrop-blur-sm">
      <section className={`absolute bg-zinc-900 rounded-md top-[40%] -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-xl shadow-white/10 border border-white/30 ${className2}`} ref={ref}>
        {children}
      </section>
    </section>
  )
}
)





export const DropDownComponent = forwardRef( function DropDownComponent({children, icon, iconContainer_Class, func} : {
  children: JSX.Element;
  icon: JSX.Element;
  iconContainer_Class?: string;
  func?: () => void;
}, ref : any) {
  const [dropdown, showDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLButtonElement>(null);

  const HandleClickOutside = (event: MouseEvent) => {
    if (iconRef.current && !iconRef.current.contains(event.target as Node) &&
    dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
    (ref ? !ref.current?.contains(event.target as Node) : true)) {
      showDropdown(false);
      if (func) return func();
    }
  } 

  useEffect(() => {
    document.body.addEventListener("mousedown", HandleClickOutside);
    
    return () => {
      document.body.removeEventListener("mousedown", HandleClickOutside);
    }
  },[dropdown, dropdownRef])

  return (
    <>
      <button className={iconContainer_Class} ref={iconRef} onClick={() => showDropdown(!dropdown)}>
        {icon}
      </button>
      <div ref={dropdownRef} className="relative">
        {dropdown && children}
      </div>
    </>
  )
})