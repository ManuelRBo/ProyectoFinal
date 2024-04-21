export default function MessageBox({ type }) {
  return (
    <div className={`max-w-xl ${type=='sent' ? 'bg-[#80C2FF]' : 'bg-[#D5EBFF]'} pl-3 pr-3 py-2 rounded-2xl flex flex-col`}>
      <p className="font-inter text-xs md:text-sm flex-grow font-medium">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut fermentum tortor. Duis non volutpat arcu. Integer dignissim, magna quis sodales commodo, risus turpis tempus risus, sed vehicula libero dolor vel justo.
      </p>
      <div className="self-end">
        <p className="font-inter font-light text-xs">17:30</p>
      </div>
    </div>
  )
}
