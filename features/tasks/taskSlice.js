import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import tareaService from "./taskService";


//Esto define el estado inicial del SliceStart
const initialState = {
    mistareas: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
//Crear una nueva tarea 
export const crearTarea = createAsyncThunk('tareas/crear', async(tareaData, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await tareaService.crearTarea(tareaData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.ToString()
        return thunkAPI.rejectWithValue(message)
    }
})
export const tareaSlice = createSlice({
    name: 'tarea', 
    initialState, 
    reducers:{
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(crearTarea.pending, (state) => {
                state.isLoading= true
            })
            .addCase(crearTarea.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.mistareas.push(action.payload) //Lo que me devuelva el endpoint (axios al crear una tarea)
            })
            .addCase(crearTarea.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = tareaSlice.actions
export default tareaSlice.reducer