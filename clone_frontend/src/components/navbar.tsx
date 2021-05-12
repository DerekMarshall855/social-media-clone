import { NavLink } from 'react-router-dom';


const NavBar = () => {
    return (
        <div>
            <ul>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/account_details">Profile</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/signup">Signup</NavLink></li>
            </ul>
       </div>
    );
}

export default NavBar;