export const saveAuthData = (data, setLogin) => {
    localStorage.setItem('token', data.token) 
    setLogin(data.user) 
}