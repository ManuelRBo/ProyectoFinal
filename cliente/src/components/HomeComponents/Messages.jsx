export default function Messages({ imgSrc, Icon, name, message, newMessage}) {
    return (
            <div className={`flex items-center max-md:justify-center gap-2 border-b-2 pb-1 border-gray-300 rounded-lg ${newMessage && "shadow-[0_0px_5px_4px] shadow-blue-300"}`}>
            <div className="w-max">
                {Icon && <Icon width="30px"/>}
                {imgSrc && <img src={imgSrc} alt="icon" width="40px" className="rounded-full"/>}
            </div>
            <div className="overflow-hidden">
                {name ? <h3 className="font-inter font-bold">{name}</h3> : ""}
                {message !== null ? <p className="font-inter whitespace-nowrap overflow-hidden text-ellipsis">{message}</p> : ""}
            </div>
            </div>
    );
}