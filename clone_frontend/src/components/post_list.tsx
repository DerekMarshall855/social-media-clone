import React from 'react';
import api from '../api/post_api';

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

class PostList extends React.Component<SampleProps, {posts: Post[]}> {
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
            await api.getAllPosts().then(res => {
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
                final.push(<div className="post">
                        <p>Poster: {this.state.posts[i].username}</p>
                        <p>Post: {this.state.posts[i].message}</p>
                </div>);
                if (this.state.posts[i].comments[0].name.localeCompare('') === 1) {
                    for (let x = 0; x < this.state.posts[i].comments.length; x++) {
                        final.push(<div className="comments">
                            <p>Commentor: {this.state.posts[i].comments[x].name}</p>
                            <p>Comment: {this.state.posts[i].comments[x].response}</p>
                        </div>)
                    }
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

export default PostList;