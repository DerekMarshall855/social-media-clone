import { Link } from 'react-router-dom';
import { isLogin } from '../js_functions/login';

const NavBar = () => {

    // const collapseMenuHandler = () => {
    //     let navbar = document.getElementById('navbar');
    //     if (navbar){
    //         navbar.style.visibility = "hidden";
    //     }
    // }

    if(isLogin()){
        return (
            <div>
                <input type="checkbox" id="navbar" className="ham-menu"/>
                <label htmlFor="navbar">
                    <div className="hide-des">
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                    </div>
                </label>
                <div className="navbar">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/account_details">Profile</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </div>
           </div>
        );
    } else {
        return (
            <div>
                <input type="checkbox" id="navbar" className="ham-menu"/>
                <label htmlFor="navbar">
                    <div className="hide-des">
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                        <span className="menu-line"></span>
                    </div>
                </label>
                <div className="navbar">
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </ul>
                </div>
           </div>
        );
    }

}

export default NavBar;