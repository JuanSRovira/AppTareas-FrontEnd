import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";


//Con esto ya tengo acceso al AuthSlice en la aplicacion
export const store = configureStore ({ 
    reducer: {
        auth: authReducer
    }
})
