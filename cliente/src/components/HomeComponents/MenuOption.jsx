import { Link } from "react-router-dom"
import { Icon as IconifyIcon } from '@iconify-icon/react';

export default function MenuOption({Icon, text, onClick, to, imgSrc, iconLogo}) {
  return (
    <Link to={to} className="w-full flex items-center gap-2 hover:bg-gray-300 p-2 rounded-lg cursor-pointer hover:scale-110 transition-all duration-75" onClick={onClick}>
        {iconLogo && <IconifyIcon icon={iconLogo} width="30px" />}
        {imgSrc && <img src={`/api/public/images/userData/${imgSrc}?t=${Date.now()}`}alt="icon" className="w-8 h-8 object-cover rounded-full"/>}
        {Icon && <Icon width="30px" />}
        {text && <p className="text-base font-inter font-light">{text}</p>}
    </Link>
  )
}
