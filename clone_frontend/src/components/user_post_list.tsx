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
    comments: Comment[],
    _id: string
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
                }],
                "_id":""
            }],
        }
    }

    componentDidMount = async () => {
        try {
            let name: string | null = localStorage.getItem('username');
            if(name){
                await api.searchPostUser(name).then(res => {
                    this.setState({posts: res.data.data})
                });
            }
        } catch {
            console.log("There are no posts in the db");
        }
    }

    renderPosts = () => {
        // Somehow posts became empty on catch, use > 0 + leftside && to avoid crash
        if (this.state.posts.length > 0 && this.state.posts[0].username.localeCompare("") === 1) {
            let final = [];
            let temp = this.state.posts.reverse();
            for (let i = 0; i < temp.length; i++) {
                final.push(<PostBlock key={temp[i]._id} username={temp[i].username} message={temp[i].message} id={temp[i]._id}/>);
                if(temp[i].comments[1]) {  // If > 1 comment exists
                    temp[i].comments.shift();
                    final.push(<CommentBlock key={i} comments={temp[i].comments} render={(comment: string)=><div>{comment}</div>}/>);
                }
            }
            return (<div>{final}</div>);
        } else {
            return (<div><p>The current user has not made any posts</p></div>);
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