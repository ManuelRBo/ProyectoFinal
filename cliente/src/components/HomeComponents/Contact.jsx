export default function Contact() {
    return (
        <div className="flex items-center gap-3">
            <div className="relative">
                <img src="https://randomuser.me/api/portraits/men/94.jpg" alt="" className="rounded-full" width={"60px"} />
                <div className="bg-green-500 rounded-full w-4 h-4 absolute right-0 bottom-[0.5px]"></div>
            </div>
            <h3 className="text-2xl font-semibold font-inter">Manuel</h3>
        </div>
    );
}