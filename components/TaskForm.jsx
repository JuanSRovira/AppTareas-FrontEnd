import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crearTarea } from '../features/tasks/taskSlice'

const TaskForm = () => {

    const [texto, setTexto] = useState('')
    const dispatch = useDispatch()


    const onSubmit =(e) => {
        e.preventDefault()

        dispatch(crearTarea({texto}))
        setTexto('')
    }

  return (


    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="texto">
                    Tarea <input type="text" name="texto" id="texto" value={texto} onChange={(e) => setTexto(e.target.value)} />
                </label>
            </div>
            <div className="form-group">
                <button type="submit" className='btn btn-block'>
                    Agregar una tarea
                </button>
            </div>
        </form>
    </section>
  )
}

export default TaskForm