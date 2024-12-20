import { Icon as IconLogo } from '@iconify-icon/react';
import PropTypes from 'prop-types';

export default function Messages({ imgSrc, Icon, name, message, newMessage, iconLogo}) {
    return (
            <div className={`flex max-lg:justify-center lg:gap-2 border-b-2 pb-1 p-4 max-sm:px-1 border-gray-300 shadow-lg  ${newMessage && "shadow-[0_0px_5px_4px] rounded-lg shadow-blue-300"}`}>
            <div className="w-max">
            {imgSrc ? (
                    <img src={`/public/images/userData/${imgSrc}`} alt="User" width="40px" className="rounded-full w-10 h-10 object-cover max-md:w-10 max-md:h-10" />
                ) : iconLogo ? (
                    <IconLogo icon={iconLogo} width="30px" />
                ) : (
                    <Icon width="30px" />
                )}
            </div>
            <div className="overflow-hidden">
                {name ? <h3 className="font-inter font-bold">{name}</h3> : ""}
                {message !== null ? <p className="font-inter whitespace-nowrap overflow-hidden text-ellipsis">{message}</p> : ""}
            </div>
            </div>
    );
}

Messages.propTypes = {
    imgSrc: PropTypes.string,
    Icon: PropTypes.elementType,
    name: PropTypes.string,
    message: PropTypes.string,
    newMessage: PropTypes.bool,
    iconLogo: PropTypes.string
}