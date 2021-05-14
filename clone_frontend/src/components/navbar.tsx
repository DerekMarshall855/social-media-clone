import { NavLink } from 'react-router-dom';
import { isLogin } from '../js_functions/login';

const NavBar = () => {
    if(isLogin()){
        return (
            <div className="navbar">
                <ul>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/account_details">Profile</NavLink></li>
                    <li><NavLink to="/logout">Logout</NavLink></li>
                </ul>
           </div>
        );
    } else {
        return (
            <div className="navbar">
                <ul>
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                    <li><NavLink to="/signup">Signup</NavLink></li>
                </ul>
           </div>
        );
    }

}

export default NavBar;