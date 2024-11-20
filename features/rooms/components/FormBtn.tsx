"use client";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import RoomForm from "./RoomForm";


export default function FormBtn() {
  const [shouldShow, setShouldShow] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setShouldShow(true)}
        className="group bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover"
      >
        <a
          className="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center"
          href="#"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </a>
        <a
          className="text-white/50 group-hover:text-white group-hover:smooth-hover text-center"
          href="#"
        >
          Create group
        </a>
      </div>

      <Modal
        isOpen={shouldShow}
        onClose={() => setShouldShow(false)}
      >
        <RoomForm />
      </Modal>
    </>
  );
}
