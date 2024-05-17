export default function MessageBox({ type, message, time }) {
  return (
    <div className={`max-w-xl ${type=='sent' ? 'bg-[#80C2FF]' : 'bg-[#D5EBFF]'} pl-3 pr-3 py-2 rounded-2xl flex flex-col`}>
      <p className="font-inter text-xs md:text-sm flex-grow font-medium">
        {message}
      </p>
      <div className="self-end">
        <p className="font-inter font-light text-xs">{time}</p>
      </div>
    </div>
  )
}
