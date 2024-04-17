
export default function BotonAutenticar({texto, onClick}) {
  return (
    <button
        onClick={onClick}
        className="text-2xl font-inter bg-gradient-to-r from-[#9146EE] to-[#0085FF] text-white font-bold py-2 rounded focus:outline-none  hover:from-[#0085FF] hover:to-[#9146EE] transition duration-500"
    >{texto}</button>
  )
}
