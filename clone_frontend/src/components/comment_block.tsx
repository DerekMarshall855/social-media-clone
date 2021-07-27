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
            <div className="card">
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>
                            {render(comment.name)}
                            <ul>
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