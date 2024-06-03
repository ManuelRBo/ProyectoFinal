import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ModalLogIn from "./ModalsAuth/ModalLogIn";
import ModalRegister from "./ModalsAuth/ModalRegister";
import PropTypes from 'prop-types';

export default function Modal({ auth, onClose }) {
  let [isOpen, setIsOpen] = useState(true);

  function close() {
    setIsOpen(false);
    onClose();
  }

  return (
    <Transition
      show={isOpen}
      enter="transition duration-200 ease-in-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-150 ease-in-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog onClose={close} className={`fixed inset-0 flex items-center justify-center p-4 z-10 mx-auto max-w-xl lg:p-0 ${auth == 'register' && "py-5"}`} >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50"/> 
        <Dialog.Panel className="relative z-20 bg-white rounded-md shadow-lg w-full mx-auto px-10 py-7 max-h-[95%] overflow-auto">
            {auth == 'login' ? <ModalLogIn /> : <ModalRegister onClose={close} />}
        </Dialog.Panel>
      </Dialog>
    </Transition>
  );
}

Modal.propTypes = {
  auth: PropTypes.string,
  onClose: PropTypes.func
}


