import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'

import React from 'react'

const LogInto = () => {

    const [formData, setFormData] =  useState({
        email: '',
        password: ''
    })
    const { email, password } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }
    
    return (
        <section className="heading">
            <>
                <h1>
                    <FaSignInAlt/> Login
                </h1>
                <p>
                        Bienvenido, coloca tus credenciales
                </p>
    
                <section className="form">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" id="email" name="email" value={email} placeholder="¿Cual es tu correo?" onChange={onChange} />
                            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Escribe tu contraseña" onChange={onChange} />
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
    

export default LogInto