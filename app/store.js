import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import tareaReducer from '../features/tasks/taskSlice'


//Con esto ya tengo acceso al AuthSlice en la aplicacion
export const store = configureStore ({ 
    reducer: {
        auth: authReducer,
        tarea: tareaReducer
    }
})
