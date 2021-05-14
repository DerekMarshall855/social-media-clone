import React from 'react';
import LogoutForm from '../components/logout_form';


class Logout extends React.Component {
    render() {
        return (
            <div>
                <h3>Logout</h3>
                <p>Are you sure you would like to logout?</p>
                <LogoutForm/>
            </div>
        
        );
    }
}

export default Logout;