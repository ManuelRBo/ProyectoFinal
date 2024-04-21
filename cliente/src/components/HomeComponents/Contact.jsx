export default function Contact() {
    return (
        <div className="flex items-center gap-3">
            <div className="relative">
                <img src="https://randomuser.me/api/portraits/men/94.jpg" alt="" className="rounded-full w-10 md:w-16" />
                <div className="bg-green-500 rounded-full w-3 h-3 md:w-4 md:h-4 absolute right-0 bottom-[0.5px]"></div>
            </div>
            <h3 className="text-base md:text-2xl font-semibold font-inter">Manuel</h3>
        </div>
    );
}