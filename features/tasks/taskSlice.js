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

//Borrar Tarea

export const deleteTarea = createAsyncThunk('tareas/delete', async(id, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await tareaService.deleteTarea(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.ToString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Mostrar las tareas en el Dashboard
export const getTareas = createAsyncThunk('/tareas/getTareas', async(_, thunkAPI ) => { //El underscore indica que no voy a pasar ningun dato, pues ese dato es el id del usuario que esta incrustado en el TOKEN
        try {
            const token = thunkAPI.getState().auth.user.token
            return await tareaService.getTareas(token)
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
            .addCase(getTareas.pending, (state) => {
                state.isLoading= true
            })
            .addCase(getTareas.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.mistareas = action.payload
            })
            .addCase(getTareas.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteTarea.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTarea.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.mistareas = state.mistareas.filter((tarea) => tarea._id !== action.payload.id) 
            })
            .addCase(deleteTarea.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = tareaSlice.actions
export default tareaSlice.reducer