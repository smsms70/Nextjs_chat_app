"use client"

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";



export function Modal ({children, Icon, className2, style} : {
  children: JSX.Element;
  Icon: JSX.Element;
  className2: string;
  style?: string;
}) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-y-hidden")
    } else (
      document.body.classList.remove("overflow-y-hidden")
    )
  },[showModal]);

  return (
    <>
      <button
      onClick={() => setShowModal(!showModal)}>
        {Icon}
      </button>

      {showModal && createPortal(
        <BlurBackgroundModal
          param={showModal}
          func={setShowModal}
          className2={className2}
        >
            {children}
        </BlurBackgroundModal>, 
        document.body
      )}

    </>
  )
}

export function BlurBackgroundModal ({children, param, className2, func } : {
  children: JSX.Element;
  param: boolean;
  className2: string;
  func: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const refProp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutHandler = (e: MouseEvent) => {
      if (refProp.current && !refProp.current.contains(e.target as Node) ) {
        func(false);
      }
    } 
    document.addEventListener("mousedown", clickOutHandler);
    return () => {
      document.removeEventListener('mousedown', clickOutHandler);
    };
  }, [refProp, param])

  return (
    <section className="h-screen w-screen absolute top-0 left-0 backdrop-blur-sm">
      <section className={`absolute bg-zinc-900 rounded-md top-[40%] -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-xl shadow-white/10 border border-white/30 ${className2}`}
      ref={refProp}>
      {children}
      </section>
    </section>
  )
}