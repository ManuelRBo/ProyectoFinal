import InputForm from "./InputForm";

export default function ModalLogIn(){
    return(
        <form>
        <h2 className="text-center font-bold font-inter text-4xl">Iniciar Sesión</h2>
        <div className="mt-5">
            <InputForm 
                label={"Usuario"}
                type={'text'}
            />
        </div>
        </form>
    )
}