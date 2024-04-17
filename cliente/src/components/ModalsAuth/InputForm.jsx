export default function InputForm({label, type, placeholder}){
    return(
       <div className="flex flex-col gap-2">
        <label 
            htmlFor={label.toLowerCase()}
            className="text-base font-inter"
        >{label}</label>
        <input 
            type={type} 
            placeholder={placeholder} 
            id={label.toLowerCase()}
            className="w-full border-[#004280] border-2 p-1"
            />
        </div>
    )
}