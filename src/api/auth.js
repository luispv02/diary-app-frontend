import axiosInstance from "./axios";

export const registerUser = async(user) => {
    const response = await axiosInstance.post('/auth/register', user);
    return response.data
}

export const loginUser = async(user) => {
    const response = await axiosInstance.post('/auth/login', user);
    return response.data
}

export const renewToken = async() => {
    const response = await axiosInstance.get('/auth/renew');
    return response.data
}

