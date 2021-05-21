import React from 'react';
import UserPostList from '../components/user_post_list';

class AccountDetails extends React.Component {
    render() {
        return (
            <div>
                <h1>{localStorage.getItem('username')}</h1>
                <h2>All Posts:</h2>
                <UserPostList />
            </div>
        
        );
    }
}

export default AccountDetails;