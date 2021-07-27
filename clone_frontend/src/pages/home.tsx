import React from 'react';
import PostList from '../components/post_list';
import PostForm from '../components/post_form';


const Home = () => {
    return (
        <div className="home">
            <PostForm />
            <PostList />
        </div>
    )
}

export default Home;