import InputForm from "./InputForm";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import BotonAutenticar from "../BotonAutenticar";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

export default function ModalLogIn() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm();
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmitForm = (data)=>{
        toast.promise(
            axios.post("/api/auth/login", data),
            {
              pending: "Iniciando Sesión...",
              success: {
                render({ data }) {
                  login();
                  return data.data.message || "Inicio de Sesión exitoso!";
                },
                autoClose: 1000,
                onClose: () => navigate("/home"),
              },
              error: {
                render({ data }) {
                  if (data.response && data.response.data && data.response.data.errors) {
                    const serverErrors = data.response.data.errors[0];
                      setError(serverErrors.path, { message: serverErrors.msg }); 
                    return "Error al iniciar sesión. Compruebe los datos ingresados.";
                  }
                  return "Error al iniciar sesión. Intente más tarde.";
                },
                autoClose: 2000,
              },
            },
            {
              position: "top-right",
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            }
          );
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <h2 className="text-center font-bold font-inter text-4xl">Iniciar Sesión</h2>
            <div className="mt-5 flex flex-col gap-4">
                <InputForm 
                    label="Usuario"
                    type="text"
                    placeholder="Ingrese su usuario"
                    register={register("user_email", { required: "Este campo es obligatorio" })}
                    error={errors.user_email}
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
