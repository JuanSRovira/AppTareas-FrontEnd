import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import TaskForm from "../components/TaskForm"



const Dashboards = () => {

  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/logInto')
    }
  }, [user, navigate])
  

  return (
    <>
      <section className="heading">
        <h1>
          Bienvenido {user && user.name}
          <p>Dashboard de tareas</p>
        </h1>
          <TaskForm/>
      </section>
    </>
  )
}

export default Dashboards