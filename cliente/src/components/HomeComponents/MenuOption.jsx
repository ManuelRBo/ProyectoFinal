import { Link } from "react-router-dom"
import { Icon as IconifyIcon } from '@iconify-icon/react';
import PropTypes from 'prop-types';

export default function MenuOption({Icon, text, onClick, to, imgSrc, iconLogo}) {
  return (
    <Link to={to} className="w-full flex items-center gap-2 hover:bg-gray-300 p-2 rounded-lg cursor-pointer hover:scale-110 transition-all duration-75" onClick={onClick}>
        {iconLogo && <IconifyIcon icon={iconLogo} width="30px" />}
        {imgSrc && <img src={`/public/images/userData/${imgSrc}?t=${Date.now()}`}alt="icon" className="w-8 h-8 object-cover rounded-full"/>}
        {Icon && <Icon width="30px" className="flex-shrink-0" />}
        {text && <p className="text-base font-inter font-light">{text}</p>}
    </Link>
  )
}


MenuOption.propTypes = {
  Icon: PropTypes.elementType,
  text: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
  imgSrc: PropTypes.string,
  iconLogo: PropTypes.string
}