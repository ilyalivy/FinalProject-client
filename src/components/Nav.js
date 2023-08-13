import { useContext } from 'react'; 
import UserContext from '../UserContext';
import { NavLink, Link, useLocation } from 'react-router-dom';
import './Nav.css'

const Nav = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className={user ? "navbar" : ""}>

      <div className='logo'>
        {user ? <p>Chandler</p> : ""}
      </div>
      <div className='links'>
        {/* {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>} */}
      {user && <NavLink to="/profile" className={isActive("/profile") ? 'link linkactive' : 'link'}>My profile</NavLink>}
      {user && <NavLink to="/tvseriesfriends" className={isActive("/tvseriesfriends") ? 'link linkactive' : 'link'}>TV mates</NavLink>}
      {user && <Link to="/logout" className='link'>Logout</Link>} {/* Add this link */}
      </div>
      
    </div>
  );
}

export default Nav;