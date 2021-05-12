import React from 'react';
import PostList from '../components/post_list';
import PostForm from '../components/post_form';

class Home extends React.Component {
    render() {
        return (
            <div>
                <PostForm />
                <PostList />
            </div>
        
        );
    }
}

export default Home;