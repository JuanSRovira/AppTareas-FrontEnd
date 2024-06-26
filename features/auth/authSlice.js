import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';

/*Guardar el token en el navegador en el LOCAL STORAGE
Obtener el Local Storage los datos en caso de que existan:
*/

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user: null, //No comenzamos con un usuario
    //SI YA EXISTE UN USUARIO EN EL LS PONLO, DE LO CONTRARIO COLOCA NULL
    isError: false, //Cuando el estado es rechazado
    isSuccess: false, //Cuando el estado es permitido 'fullfield'
    isLoading: false, //Cuando esta pendiente
    message: '' //Empty string porque el rejected va a regresar el mensaje en el backend "Throw New Error"
}
//FUNCION PARA LOGEAR A UN USUARIO_________________________________________________________________________________________________________//
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
        return await authService.login(user) //Conexion del Login segun lo reciba por medio del AuthService
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.ToString()
        return thunkAPI.rejectWithValue(message)
    }
})

//__________________________________________________________________________________________________________________________________________//

//FUNCION PARA REGISTRAR USUARIO DESDE EL FRONTEND-----------------------------------------------------------------------------------------------//
//REGISTRO.4 Se creara un Thunk que sera enviado al archivo AuthService
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.ToString()
        return thunkAPI.rejectWithValue(message)
    }
})
//------------------------------------------------------------------------------------------------------------------------------------------------//
export const authSlice = createSlice ({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            //ERRORPATH Aqui se define QUE SI HAY UN ERROR se mande un mensaje
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
        }
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer