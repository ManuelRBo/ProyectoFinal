import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

export default function UserDataModal({userDataModalOpen, id, setUserDataModalOpen}) {
  
  useEffect(() => {
    

  const close = () => {
    setUserDataModalOpen(false);
  };

  return (
    <Transition
        show={userDataModalOpen}
        enter="transition-opacity duration-200 ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150 ease-in-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as={Fragment}
      >
        <Dialog
          onClose={close}
          className="fixed inset-0 flex items-center justify-center p-4 z-10 w-full mx-auto "
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 transition-opacity duration-200 ease-in-out" />
          <Transition.Child
            enter="transition ease-in-out duration-200 transform"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition ease-in-out duration-150 transform"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
            style={{ maxWidth: "600px", width: "90%" }}
          >
            <Dialog.Panel className="relative z-20 bg-white rounded-md shadow-lg mx-auto px-5 py-12">
              
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
  )
}
