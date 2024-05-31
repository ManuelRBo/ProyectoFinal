import UserDataModal from "./HomeComponents/UserDataModal"

export default function MessageBox({ type, message, time, sender, sender_id, userDataModalOpen, setUserDataModalOpen}) {

  return (
    <div className={`max-w-xl min-w-28 ${type=='sent' ? 'bg-[#80C2FF]' : 'bg-[#D5EBFF]'} pl-3 pr-3 py-2 rounded-2xl flex flex-col`}>
      <h3 className="font-inter font-semibold text-xs mb-1 cursor-pointer w-fit"
        onClick={() => setUserDataModalOpen(true)}
      >{sender}</h3>
      <p className="font-inter text-xs md:text-base flex-grow break-words whitespace-pre-wrap">
        {message}
      </p>
      <div className="self-end">
        <p className="font-inter font-light text-xs">{time}</p>
      </div>
      {userDataModalOpen && <UserDataModal userDataModalOpen={userDataModalOpen} id={sender_id} setUserDataModalOpen={setUserDataModalOpen} />}
    </div>
  )
}
