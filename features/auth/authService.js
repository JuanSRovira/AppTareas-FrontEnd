import axios from 'axios'; //Esta es la que se conectara al backend

const API_URL = 'https://appdenotas.onrender.com/'

const login = async (userData) => {
    const response = await axios.post(`${API_URL}login`, userData) //<====== POST es la funcion de Postman 
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))  //Se puede colocar en cookies o en SesionStorage
    }
    return response.data                                 // La respuesta del backend SIEMPRE ES response.data
}

//registrar un usuario
//REGISTRO 5. Hará una peticion POST a AXIOS al API_URL, es decir, el trabajo de Postman medianamente...    
const register = async (userData)=> {
    const response = await axios.post(API_URL, userData) //<====== POST es la funcion de Postman 

    return response.data                                 // La respuesta del backend SIEMPRE ES response.data
}

//LogOut del usuario
const logOut = async () => {
    localStorage.removeItem('user')
}

const authService = {                                    //Se usan llaves para exportar varias cosas
    register,
    login,
    logOut
}

export default authService