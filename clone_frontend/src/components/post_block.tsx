import CommentButton from './comment_button';

type postProps = {
    username: string,
    message: string,
    id: string
}
// Add comment button onSubmit that opens text field w/ button and calls editPost to update comment
export const postBlock = ({username, message, id}: postProps) => <div className="postBlock">
    <h3>Poster: {username}</h3>
    <h4>Post: {message}</h4>
    <CommentButton pid={id}> Comment </CommentButton>
</div>

export default postBlock;