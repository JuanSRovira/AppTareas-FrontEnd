import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch, } from 'react-redux'
import { logOut, reset } from '../features/auth/authSlice'

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state)=> state.auth)

    const  onLogOut = () => {
        dispatch(logOut())
        dispatch(reset())
        navigate('/LogInto')
    }

return (



    <header className='header'>
        <div className="logo">
            <Link to= '/'>AppTareas</Link>
        </div>
        <ul>
            {user ? 
            (
                <>
                    <button className="btn" onClick={onLogOut}>
                        <FaSignOutAlt/> Salir
                    </button>
                </>
            )
            :
            (
                <>
                        <li>
                            <Link to='/Loginto'>
                                <FaSignInAlt/> Login
                            </Link>
                        </li>
                        <li>    
                            <Link to='/Register'>
                                <FaSignInAlt/> Register
                            </Link>
                        </li>
                </>
            )}
        </ul>
    </header>
  )
}

export default Header