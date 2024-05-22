import { Icon as IconLogo } from '@iconify-icon/react';

export default function Messages({ imgSrc, Icon, name, message, newMessage, iconLogo}) {
    return (
            <div className={`flex max-md:justify-center lg:gap-2 border-b-2 pb-1 p-4 border-gray-300 shadow-lg  ${newMessage && "shadow-[0_0px_5px_4px] rounded-lg shadow-blue-300"}`}>
            <div className="w-max">
            {imgSrc ? (
                    <img src={`/api/public/images/userData/${imgSrc}?t=${Date.now()}`} alt="User" width="40px" className="rounded-full" />
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