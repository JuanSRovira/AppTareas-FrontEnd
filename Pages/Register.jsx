import { useState, useEffect } from "react"
import {FaUser} from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux"
import { useActionData, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {register, reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner"

 

const Register = () => {

    const [formData, setFormData] =  useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData

    const navigate = useNavigate()              //useNavigate es parte de la libreria REACT-Router-Dom
    const dispatch = useDispatch()              //Funciona para ejecutar la funcion
    //Esta desestructuralizacion me permite tener acceso a los componentes mencionadas por medio de un useSelector
    const {user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    //Estos son componentes en estado global
    
                                                //UseEffect se usará por primera vez cuando se renderice la pagina o cuando las dependencias se modifiquen, estas se ponen al final de la llave (son las que estan arriba) EXCEPTUANDO a isLoading, debido a que cambia constantemente, de estar ahi se ciclaria el evento
    useEffect(()=> {
        if (isError) {
            toast.error(message)
            //ERRORPATH Este esta definido en el AuthSlice, en los ExtraReducers
        }
        if (isSuccess) {
            navigate('/login')
        }

        dispatch(reset())

    },[ user, isError, isSuccess, message, navigate, dispatch])

    //Esto permite que podamos escribir sobre los inputs
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    //1Previene de que se recargue la pagina guardando la informacion en los querys
    const onSubmit = (e) => {
        e.preventDefault()
    // REGISTRO.1 Si las contraseñas no coinciden, manda una alerta por Toast de que las contraseñas no coinciden
        if(password !== password2) {
            toast.error('Las contraseñas no coinciden')
        } else { //REGISTRO.2 En caso de que la condicion anterior no se cumpla, generará un objeto llamado userData
            const userData = {
                name, email, password
            }
            // REGISTRO.3 Ese objeto userData sera enviado a la funcion REGISTER.(En el slice)
            dispatch(register(userData))
        }
    }

    //El spinner se envia hasta aca abajo para que no entre en un estado ciclico
    if(isLoading) {
        return <Spinner/>
    }

    return (
    <section className="heading">
        <>
            <h1>
                <FaUser/> Registrar
            </h1>
            <p>
                Comencemos creando tus credenciales
            </p>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="name" name="name" value={name} placeholder="¿Como te llamas?" onChange={onChange} />
                        <input type="text" className="form-control" id="email" name="email" value={email} placeholder="¿Cual es tu correo?" onChange={onChange} />
                        <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Escribe tu contraseña" onChange={onChange} />
                        <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Confirma tu contraseña" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Login
                        </button>
                    </div>
                </form>
            </section>

        </>
    </section>
  )
}

export default Register