export default function Messages({ img = 'https://randomuser.me/api/portraits/men/94.jpg', name, message}) {
    return (
            <div className="flex items-center gap-2">
            <img
                src={img}
                alt="profile"
                className="rounded-full"
                width="50px"
            />
            <div className="overflow-hidden">
                {name ? <h3 className="font-inter font-bold">{name}</h3> : ""}
                {message ? <p className="font-inter whitespace-nowrap overflow-hidden text-ellipsis">{message}</p> : ""}
            </div>
            </div>
    );
}