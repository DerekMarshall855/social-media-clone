import React, {ReactNode, ReactElement} from 'react';

type Comment = {
    name: string,
    response: string
}

function CommentList({
    comments,
    render
    }: {
        comments: Comment[],
        render: (comment: string) => ReactNode;
    }): ReactElement | null {
        return (
            <div className="commentBlock">
                <h4>Comments:</h4>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index} className="user">
                            {render(comment.name)}
                            <ul className="comment">
                                <li>
                                    {render(comment.response)}
                                </li>
                            </ul>                  
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

export default CommentList;