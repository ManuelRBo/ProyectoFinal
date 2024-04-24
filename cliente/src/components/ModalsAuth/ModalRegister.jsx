import InputForm from "./InputForm";
import { useForm } from "react-hook-form";
import BotonAutenticar from "../BotonAutenticar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ModalRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleSubmitForm = (data)=>{
    axios.post("http://localhost:3000/auth/register", data)
    .then((res)=>{
      console.log(res.data)
    })
};

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <h2 className="text-center font-bold font-inter text-4xl">Registrarse</h2>
      <div className="mt-5 flex flex-col gap-4">
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

        <label htmlFor="experience" className="font-inter">
          Años de Experiencia
        </label>
        <div className="flex flex-col gap-2">
            <select
              id="experience"
              className={`w-full border-2 p-1 ${errors.experience ? "border-red-500" : "border-[#004280]"}`}
              {...register("experience", { required: "Este campo es obligatorio" })}
            >
              <option value="">Seleccione los años de experiencia</option>
              <option value="none">Sin Experiencia</option>
              <option value="junior">{"<"} 2 años - Junior</option>
              <option value="semi-senior">2 - 5 años - Semi Senior</option>
              <option value="senior">5 - 10 años - Senior</option>
              <option value="expert">{">"} 10 años - Experto</option>
            </select>
            {errors.experience && (
              <p className="text-red-500 text-xs font-inter">
                {errors.experience.message}
              </p>
            )}
        </div>
      </div>
      <BotonAutenticar texto="Registrarse" className="mt-5" />
    </form>
  );
}
