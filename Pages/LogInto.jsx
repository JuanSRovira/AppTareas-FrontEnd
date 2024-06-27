import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux"
import { useActionData, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { login, reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner"

import React from 'react'

const LogInto = () => {

    const [formData, setFormData] =  useState({
        email: '',
        password: ''
    })
    const { email, password } = formData

    const navigate = useNavigate()              //useNavigate es parte de la libreria REACT-Router-Dom
    const dispatch = useDispatch()              //Funciona para ejecutar la funcion
    //Esta desestructuralizacion me permite tener acceso a los componentes mencionadas por medio de un useSelector
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(()=> {
        if (isError) {
            toast.error(message)
            //ERRORPATH Este esta definido en el AuthSlice, en los ExtraReducers
        }
        if (isSuccess) {
            navigate('/') 
        }

        dispatch(reset())

    },[ user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData ={    //Cuando se ejecute el onSubmit, creara un objeto userData con los parametros de email y password
            email, password
        }
        dispatch(login(userData))

    }

    if (isLoading) {
        return <Spinner/>
    }
    
    return (
            <>
                <section className="heading">
                <h1>
                    <FaSignInAlt/> Login
                </h1>
                <p>Bienvenido, coloca tus credenciales</p>
                </section>
    
                <section className="form">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" id="email" name="email" value={email} placeholder="¿Cual es tu correo?" onChange={onChange} />
                            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Escribe tu contraseña" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-block">
                                Login
                            </button>
                        </div>
                    </form>
                
    
                </section>
            </>
        )
    }
    

export default LogInto