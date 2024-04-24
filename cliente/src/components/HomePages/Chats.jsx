import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon as SendHover } from "@heroicons/react/24/solid";
import { Icon } from "@iconify-icon/react";
import MessageBox from "../MessageBox";

export default function Chats() {
  const [sendHover, setSendHover] = useState(false);

  return (
    <div className="flex flex-col gap-5 justify-between pb-4 h-full max-md:h-[calc(100%-80px)]">
      <div className="flex items-center max-md:justify-center gap-5 border-b-2 border-gray-200 pb-3 ml-5">
        <Icon icon="vscode-icons:file-type-js-official" width={"55px"} />
        <h2 className="text-4xl font-bold font-inter">JS</h2>
      </div>

      <div className="flex flex-col gap-10 overflow-auto">
        <div className="w-full space-y-4">
          {/* Mensajes enviados por "ti" */}
          <div className="flex justify-end">
            <div className="max-w-[70%] space-y-2">
              <MessageBox type="sent" />
              <MessageBox type="sent" />
            </div>
          </div>

          {/* Mensajes recibidos de "otra persona" */}
          <div className="flex justify-start">
            <div className="max-w-[70%] space-y-2">
              <MessageBox type="received" />
            </div>
          </div>

          {/* Otro mensaje tuyo */}
          <div className="flex justify-end">
            <div className="max-w-[70%] space-y-2">
              <MessageBox type="sent" />
              <MessageBox type="sent" />
            </div>
          </div>

          <div className="flex justify-start">
            <div className="max-w-[70%] space-y-2">
              <MessageBox type="received" />
              <MessageBox type="received" />
              <MessageBox type="received" />
            </div>
          </div>

          <div className="flex justify-end">
            <div className="max-w-[70%] space-y-2">
              <MessageBox type="sent" />
              <MessageBox type="sent" />
            </div>
          </div>
        </div>
      </div>

      <form className="flex justify-between w-full gap-5 items-center">
        <textarea
          placeholder="Escribe un mensaje"
          className="w-full rounded-2xl border-2 border-gray-300 resize-none overflow-hidden text-md font-inter"
          style={{ minHeight: "20px", maxHeight: "150px", overflowY: "auto", padding: "10px", lineHeight: "20px", outline:'none'}} // Altura mínima para una sola línea de texto
          onInput={(e) => {
            const textarea = e.target;
            textarea.style.height = "auto"; // Resetea la altura para recalculación
            const newHeight = Math.min(textarea.scrollHeight, 150); // Calcula la nueva altura pero no más de 150px
            textarea.style.height = `${newHeight}px`; // Establece la nueva altura
          }}
        />
        <button
          className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-full w-11 h-11 hover:bg-blue-600 transition-all duration-100 ease-in-out"
          onMouseEnter={() => setSendHover(true)}
          onMouseLeave={() => setSendHover(false)}
        >
          {sendHover ? (
            <SendHover width="24" />
          ) : (
            <PaperAirplaneIcon width="24" />
          )}
        </button>
      </form>
    </div>
  );
}
