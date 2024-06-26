import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
        <div className="logo">
            <Link to= '/'>AppTareas</Link>
        </div>
        <ul>
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
        </ul>
    </header>
  )
}

export default Header