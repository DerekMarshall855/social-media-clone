import React from 'react';

type postProps = {
    username: string,
    message: string
}
// Add comment button onSubmit that opens text field w/ button and calls editPost to update comment
export const postBlock = ({username, message}: postProps) => <div className="postBlock">
    <h3>Poster: {username}</h3>
    <h4>Post: {message}</h4>
    <button>Comment</button>
</div>

export default postBlock;