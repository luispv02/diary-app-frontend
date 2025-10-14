import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import { useForm } from "../../hooks/useForm";
import { useLoginUser } from "../../hooks/useAuth";
import { Loading } from "../../components/ui/Loading";

const loginFields = {
  email: '',
  password: ''
}
const loginValidations = {
  email: { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email no valido'},
  password: { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>\-_]).{6,}$/, message: 'La contraseña debe tener minimo 6 caracteres, 1 letra minuscula, 1 mayuscula, 1 numero y un caracter especial' }
}

export const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const { handleInputChange, userData, isFormValid, errors } = useForm(loginFields, loginValidations)
  const { mutate, isPending } = useLoginUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!isFormValid()){
      return 
    }

    const payload = { email: userData.email, password: userData.password };
    mutate(payload)
  }

  return (
      <>
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accede a tu diario personal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleInputChange}
              required
              className={`w-full text-sm p-3 border border-gray-300 rounded-lg transition duration-200 outline-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : ''}`}
              placeholder="tu@email.com"
            />

{            errors.email && <p className='text-red-500 text-sm'>{errors.email}</p> }
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={userData.password}
                onChange={handleInputChange}
                required
                className={`w-full text-sm p-3 border border-gray-300 rounded-lg transition duration-200 outline-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-500' : ''}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {
                  showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />
                }
              </button>
            </div>


            { errors.password && <p className='text-red-500 text-sm'>{errors.password}</p> }
          </div>

          {/* Btn Login */}
          {
            isPending
            ? <Loading />
            : <div>
                <button
                  type="submit"
                  className="w-full py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 transform hover:scale-105 cursor-pointer"
                >
                  Iniciar Sesión
                </button>
              </div>
          }

          {/* Link Register */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?
              <NavLink to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200 ml-1">
                Regístrate aquí
              </NavLink>
            </p>
          </div>
        </form>
      </>
  );
};