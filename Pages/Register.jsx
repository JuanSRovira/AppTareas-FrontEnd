import { useState, useEffect } from "react"
import {FaUser} from 'react-icons/fa'

const Register = () => {

    const [formData, setFormData] =  useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const {name, email, password, password2} = formData
    //Esto permite que podamos escribir sobre los inputs
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    //Previene de que se recargue la pagina guardando la informacion en los querys
    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
    <section className="heading">
        <>
            <h1>
                <FaUser/> Register
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
                        <input type="password" className="form-control2" id="password2" name="password2" value={password2} placeholder="Confirma tu contraseña" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">
                            Submit
                        </button>
                    </div>
                </form>
            </section>

        </>
    </section>
  )
}

export default Register