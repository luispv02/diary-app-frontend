import { useEffect, useState } from "react";

export const useForm = (data = {}, formValidations = {}) => {
  const [userData, setUserData] = useState(data)
  const [errors, setErrors] = useState({})
  
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setUserData(data);
    }
  }, [data]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const isFormValid = () => {

    let objErrors = {}

    for(const value in formValidations){
      const inputValue = userData[value].trim()
      const validate = formValidations[value]

      if(inputValue.length < validate.minLength){
        objErrors[value] = validate.message || 'Invalido'
      }
      if(validate.pattern && !validate.pattern.test(inputValue)){
        objErrors[value] = validate.message || 'Invalido'
      }
    }

    if(userData.confirmPassword && userData.password !== userData.confirmPassword){
      objErrors['confirmPassword'] = 'Las contraseñas no coinciden';
    }

    setErrors(objErrors);
    return Object.keys(objErrors).length === 0
  }


  return {
    handleInputChange,
    userData,
    isFormValid,
    errors
  }
};