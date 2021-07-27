import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';

const defaultContainerProps = {
    heading: <Link className="brand" to="/home">Derek's Blog Website</Link>,

};

//Default Typings
type ContainerProps = typeof defaultContainerProps;
function Header({ heading }: ContainerProps): ReactElement | null {

    const burgerMenuHandler = () => {
        let navbar = document.getElementById('navbar');
        if (navbar){
            navbar.style.display = "block";
        }
    }

    return (
        <header className="row">
            <div>
                {heading}
            </div>
            <div className="menu">
                <button onClick={burgerMenuHandler} className="menuButton">&#9776;</button>
            </div>
        </header>
    );
}
Header.defaultProps = defaultContainerProps;

export default Header;
