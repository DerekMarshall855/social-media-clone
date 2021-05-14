import React from 'react';


class AccountDetails extends React.Component {
    render() {
        return (
            <div>
                <h1>{localStorage.getItem('username')}</h1>
                <h3>Add:</h3>
                <ol>
                    <li>Username</li>
                    <li>List of Posts</li>
                </ol>
            </div>
        
        );
    }
}

export default AccountDetails;