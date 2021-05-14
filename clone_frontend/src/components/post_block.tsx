import React from 'react';

type postProps = {
    username: string,
    message: string
}

export const postBlock = ({username, message}: postProps) => <div className="postBlock">
    <h3>Poster: {username}</h3>
    <h4>Post: {message}</h4>
</div>

export default postBlock;