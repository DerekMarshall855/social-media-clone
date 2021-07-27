import { Link } from 'react-router-dom';
import { isLogin } from '../js_functions/login';

const NavBar = () => {

    const collapseMenuHandler = () => {
        let navbar = document.getElementById('navbar');
        if (navbar){
            navbar.style.display = "none";
        }
    }

    if(isLogin()){
        return (
            <div className="navbar" id="navbar">
                <ul>
                    <li><button onClick={collapseMenuHandler} className="menuButton">x</button></li>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/account_details">Profile</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
           </div>
        );
    } else {
        return (
            <div className="navbar" id="navbar">
                <ul>
                    <li><button onClick={collapseMenuHandler} className="menuButton">x</button></li>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </ul>
           </div>
        );
    }

}

export default NavBar;