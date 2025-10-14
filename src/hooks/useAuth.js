import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser, registerUser, renewToken } from "../api/auth";
import { useAuthStore } from "../stores/useAuthStore";
import { toast } from "react-toastify";
import { saveAuthData } from "../helpers/saveAuthData";


const createAuthMutation = (mutationFn, errorMsg) => {
    const setLogin = useAuthStore((state) => state.setLogin);

    return useMutation({
        mutationFn,
        onSuccess: (data) => saveAuthData(data, setLogin),
        onError: (error) => toast.error(error?.response?.data?.msg || errorMsg)
    })
}

export const useRegisterUser = () => {
    return createAuthMutation(registerUser, "Error al registrar usuario")
}

export const useLoginUser = () => {
    return createAuthMutation(loginUser, "Error al iniciar sesión")
}

export const useRenewToken = () => {
    return useQuery({
        queryKey: ['token'],
        queryFn: renewToken,
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
}


