import InputForm from "./InputForm";
import { useForm } from "react-hook-form";
import { toast, Bounce } from "react-toastify";
import BotonAutenticar from "../BotonAutenticar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../../stores/useAuthStore";

export default function ModalRegister() {
  let {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmitForm = (data) => {
    toast.promise(
      axios.post("/api/auth/register", data),
      {
        pending: "Registrando...",
        success: {
          render({ data }) {
            login();
            return data.data.message || "Registro exitoso!";
          },
          autoClose: 2000,
          onClose: () => navigate("/home"),
        },
        error: {
          render({ data }) {
            if (data.response && data.response.data && data.response.data.errors) {
              const serverErrors = data.response.data.errors;
              serverErrors.forEach((error) => {
                setError(error.path, { message: error.msg }); 
              });
              return "Error al registrarse. Compruebe los datos ingresados.";
            }
            return "Error al registrarse. Intente más tarde.";
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
      <h2 className="text-center font-bold font-inter text-4xl">Registrarse</h2>
      <div className="mt-2 flex flex-col gap-3">
        <InputForm
          label="Nombre de Usuario"
          type="text"
          placeholder="Ingrese su nombre de usuario"
          register={register("username", {
            required: "Este campo es obligatorio",
          })}
          error={errors.username}
        />

        <InputForm
          label="Nombre"
          type="text"
          placeholder="Ingrese su nombre"
          register={register("name", { required: "Este campo es obligatorio" })}
          error={errors.name}
        />

        <InputForm
          label="Apellido"
          type="text"
          placeholder="Ingrese su apellido"
          register={register("lastname", {
            required: "Este campo es obligatorio",
          })}
          error={errors.lastname}
        />

        <InputForm
          label="Fecha de Nacimiento"
          type="date"
          placeholder="Ingrese su fecha de nacimiento"
          register={register("birthdate", {
            required: "Este campo es obligatorio",
            max: {
              value: new Date().toISOString().split("T")[0],
              message:
                "La fecha de nacimiento no puede ser mayor a la fecha actual",
            },
          })}
          error={errors.birthdate}
        />

        <InputForm
          label="Correo Electrónico"
          type="email"
          placeholder="Ingrese su correo electrónico"
          register={register("email", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "Ingrese un correo válido",
            },
          })}
          error={errors.email}
        />

        <InputForm
          label="Contraseña"
          type="password"
          placeholder="Ingrese su contraseña"
          register={register("password", {
            required: "Este campo es obligatorio",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
              message: "La contraseña debe incluir letras y números",
            },
          })}
          error={errors.password}
        />

        <div className="flex flex-col">
          <label htmlFor="experience" className="font-inter">
            Años de Experiencia
          </label>
          <div className="flex flex-col gap-2">
            <select
              id="experience"
              className={`w-full border-2 p-1 ${
                errors.experience ? "border-red-500" : "border-[#004280]"
              }`}
              {...register("experience", {
                required: "Este campo es obligatorio",
              })}
            >
              <option value="">Seleccione los años de experiencia</option>
              <option value="ninguna">Sin Experiencia</option>
              <option value="junior">{"<"} 2 años - Junior</option>
              <option value="semi-senior">2 - 5 años - Semi Senior</option>
              <option value="senior">5 - 10 años - Senior</option>
              <option value="experto">{">"} 10 años - Experto</option>
            </select>
            {errors.experience && (
              <p className="text-red-500 text-xs font-inter">
                {errors.experience.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <BotonAutenticar texto="Registrarse" className="mt-5" />
    </form>
  );
}
