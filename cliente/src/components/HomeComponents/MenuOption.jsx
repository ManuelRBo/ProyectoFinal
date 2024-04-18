

export default function MenuOption({Icon, text}) {
  return (
    <div className="flex items-center gap-2 hover:bg-gray-300 p-2 rounded-lg cursor-pointer">
        <Icon width="30px" />
        {text && <p className="text-base font-inter font-light">{text}</p>}
    </div>
  )
}
