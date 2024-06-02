import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function UserDataModal({ userDataModalOpen, id, setUserDataModalOpen }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (userDataModalOpen) {
      axios
        .get(`/api/userData/userDataModal/${id}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userDataModalOpen, id]);

  const close = () => {
    setUserDataModalOpen({ open: false, id: "" });
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
            <Dialog.Title>
              <h1 className="text-2xl font-bold text-center mb-3">Datos del usuario</h1>
            </Dialog.Title>
            <Dialog.Description>
              <div className="flex justify-center">
                {userData.img ? (
                  <img
                    src={`/api/public/images/userData/${userData.img}?t=${Date.now()}`}
                    alt="icon"
                    className="rounded-full w-10 h-10 object-cover md:w-14 md:h-14"
                  />
                ) : (
                  <UserCircleIcon width="70px" />
                )}
              </div>
              <p className="text-center text-xl font-bold mt-3">
                Nombre de usuario <div className="font-inter font-normal">{userData.username}</div>
              </p>
              <div className="flex justify-evenly">
                <p className="text-center text-lg font-bold mt-3 font-inter">
                  Amigos <div className="font-inter font-normal">{userData.friends}</div>
                </p>
                <p className="text-center text-lg font-bold mt-3 font-inter">
                  Experiencia <div className="font-inter font-normal capitalize">{userData.exp}</div>
                </p>
                <p className="text-center text-lg font-bold mt-3 font-inter">
                  Canales <div className="font-inter font-normal">{userData.channels}</div>
                </p>
              </div>
            </Dialog.Description>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
