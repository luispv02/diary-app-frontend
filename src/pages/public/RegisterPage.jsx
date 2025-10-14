import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import { useForm } from "../../hooks/useForm";
import { useRegisterUser } from "../../hooks/useAuth";
import { Loading } from "../../components/ui/Loading";

const registerFields = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const registerValidations = {
  name: { minLength: 2, message: 'El nombre debe tener minimo 2 caracteres'},
  email: { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Email no valido'},
  password: { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>\-_]).{6,}$/, message: 'La contraseña debe tener minimo 6 caracteres, 1 letra minuscula, 1 mayuscula, 1 numero y un caracter especial' },
}


export const RegisterPage = () => {

  const { handleInputChange, userData, isFormValid, errors } = useForm(registerFields, registerValidations)
  const { mutate, isPending } = useRegisterUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!isFormValid()){
      return 
    }

    const { name, email, password } = userData;
    const payload = { name, email, password };
    mutate(payload)
  }

  return (
      <>
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Registro
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Crea tu cuenta para tu diario personal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={userData.name}
              onChange={handleInputChange}
              required
              className={`w-full text-sm p-3 border border-gray-300 rounded-lg transition duration-200 outline-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Nombre"
            />

            { errors.name && <p className='text-red-500 text-sm'>{errors.name}</p> }
          </div>

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
            { errors.email && <p className='text-red-500 text-sm'>{errors.email}</p> }
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
                className={`w-full text-sm p-3 border border-gray-300 rounded-lg transition duration-200 outline-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password || errors.confirmPassword ? 'border-red-500' : ''}`}
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

            { (errors.password || errors.confirmPassword) && <p className='text-red-500 text-sm'>{errors.password || errors.confirmPassword}</p> 
            }
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={userData.confirmPassword}
                onChange={handleInputChange}
                required
                className={`w-full text-sm p-3 border border-gray-300 rounded-lg transition duration-200 outline-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password || errors.confirmPassword ? 'border-red-500' : ''}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {
                  showConfirmPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />
                }
              </button>
            </div>
            { errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword}</p> }
          </div>

          {/* Btn register */}
          {
            isPending
            ? <Loading />
            : <div>
                <button
                  type="submit"
                  className="w-full py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 transform hover:scale-105 cursor-pointer"
                >
                  Registrarse
                </button>
              </div>
          }

          {/* Link login */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?
              <NavLink to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200 ml-1">
                Inicia sesión
              </NavLink>
            </p>
          </div>
        </form>
      </>
  );
};