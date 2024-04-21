import { Link } from "react-router-dom"

export default function MenuOption({Icon, text, onClick, to}) {
  return (
    <Link to={to} className="w-full flex items-center gap-2 hover:bg-gray-300 p-2 rounded-lg cursor-pointer hover:scale-110 transition-all duration-75" onClick={onClick}>
        <Icon width="30px" />
        {text && <p className="text-base font-inter font-light">{text}</p>}
    </Link>
  )
}
