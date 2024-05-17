export default function Messages({ imgSrc, Icon, name, message}) {
    return (
            <div className="flex items-center gap-2">
            {Icon && <Icon width="30px" />}
            {imgSrc && <img src={imgSrc} alt="icon" width="40px" className="rounded-full"/>}
            <div className="overflow-hidden">
                {name ? <h3 className="font-inter font-bold">{name}</h3> : ""}
                {message !== null ? <p className="font-inter whitespace-nowrap overflow-hidden text-ellipsis">{message}</p> : ""}
            </div>
            </div>
    );
}