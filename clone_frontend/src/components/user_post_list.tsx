import React from 'react';
import api from '../api/post_api';

// Components
import PostBlock from './post_block';
import CommentBlock from './comment_block';

type Comment = {
    name: string,
    response: string
}

type Post = {
    username: string,
    message: string,
    comments: Comment[]
}

type SampleProps = {

}

class UserPostList extends React.Component<SampleProps, {posts: Post[]}> {
    constructor(props: SampleProps) {
        super(props);
        this.state = {
            posts: [{
                "username":"",
                "message":"",
                "comments":[{
                    "name":"",
                    "response":""
                }]
            }],
        }
    }

    componentDidMount = async () => {
        console.log(this.state);
        try {
            await api.searchPostUser('Derek').then(res => {
                this.setState({posts: res.data.data})
                console.log(this.state.posts);
            });
        } catch {
            console.log("There are no posts in the db");
        }
    }

    renderPosts = () => {
        if (this.state.posts[0].username.localeCompare("") === 1) {
            let final = [];
            for (let i = 0; i < this.state.posts.length; i++) {
                // Change later to push post_block components for better organization
                // Post block should include comment + like button
                // Comment updates post w/ new comment, like adds +1 to like counter
                final.push(<PostBlock username={this.state.posts[i].username} message={this.state.posts[i].message} />);
                if (this.state.posts[i].comments[0].name.localeCompare('') === 1) { // Only render comments if they exist
                    final.push(<CommentBlock comments={this.state.posts[i].comments} render={(comment: string)=><div>{comment}</div>}/>)
                }
            }
            return (<div>{final}</div>);
        } else {
            return (<div><p>There are no posts in the DB</p></div>);
        }
    }

    render = () => {
        return (
            <div>
                {this.renderPosts()}
            </div>
        )
    }

}

export default UserPostList;