import InputForm from "./InputForm";
import { useForm } from "react-hook-form";
import BotonAutenticar from "../BotonAutenticar";
import { useNavigate } from "react-router-dom";

export default function ModalLogIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const handleSubmitForm = (data)=>{
        console.log(data);
        navigate("/home");
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <h2 className="text-center font-bold font-inter text-4xl">Iniciar Sesión</h2>
            <div className="mt-5 flex flex-col gap-4">
                <InputForm 
                    label="Usuario"
                    type="text"
                    placeholder="Ingrese su usuario"
                    register={register("user", { required: "Este campo es obligatorio" })}
                    error={errors.user}
                />

                <InputForm
                    label="Contraseña"
                    type="password"
                    placeholder="Ingrese su contraseña"
                    register={register("password", {
                        required: "Este campo es obligatorio",
                        minLength: {
                            value: 6,
                            message: "La contraseña debe tener al menos 6 caracteres"
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                            message: "La contraseña debe incluir letras y números"
                        }
                    })}
                    error={errors.password}
                />
            </div>
            <BotonAutenticar texto="Iniciar Sesión" className="mt-5" />
        </form>
    );
}
