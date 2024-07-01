import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import TaskForm from "../components/TaskForm"
import Spinner from '../components/Spinner'
import { getTareas, reset } from "../features/tasks/taskSlice"
import TareaItem from "../components/TareaItem"


const Dashboards = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const {user} = useSelector((state) => state.auth)

  const {mistareas, isLoading, isError, message } = useSelector((state) =>  state.tarea)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/logInto')
    } else{
      dispatch(getTareas())
    }
    return ()=> {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading){
    return <Spinner/>
  }
  

  return (
    <>
      <section className="heading">
        <h1>
          Bienvenido {user && user.name}
        </h1>
          <p>Dashboard de tareas</p>
        
      </section>

          <TaskForm/>

      <section className="content">
        {mistareas.length > 0 ? 
          (
            <div className="tareas">
          {mistareas.map((tarea) => (
            <TareaItem key={tarea._id} tarea={tarea}/>
          ))}
        </div>
        ) : (
              <h3>Todavia no tienes tareas, empieza escribiendo una!</h3>
            ) 
        }
      </section>
    </>
  )
}

export default Dashboards