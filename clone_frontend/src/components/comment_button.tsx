import React, { useReducer, useEffect, ReactElement, ReactNode } from 'react';
import api from '../api/post_api';

//state type
type State = {
  response:  string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

type Comment = {
    name: string,
    response: string
}

const initialState:State = {
  response: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false
};

type Action = { type: 'setResponse', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'commentSuccess', payload: string }
  | { type: 'commentFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setResponse': 
      return {
        ...state,
        response: action.payload
      };
    case 'setIsButtonDisabled': 
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'commentSuccess': 
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'commentFailed': 
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError': 
      return {
        ...state,
        isError: action.payload
      };
  }
}

type CommentProps = {
    pid: string,
    children: ReactNode
}

function CommentButton({pid, children} : CommentProps): ReactElement {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        if (state.response.trim()) { // Cuts trailing spaces
        dispatch({
        type: 'setIsButtonDisabled',
        payload: false
        });
        } else {
        dispatch({
            type: 'setIsButtonDisabled',
            payload: true
        });
        }
    }, [state.response]);

    const handleComment = async () => {
        var obj: Comment = JSON.parse(`{"comment":{
                                            "name":"${localStorage.getItem('username')}",
                                            "response":"${state.response}"}
                                        }`);
        try {
            await api.editCommentsByID(pid, obj).then(res => {
                dispatch({
                    type: 'commentSuccess',
                    payload: 'Comment Successful'
                })
            })
        } catch {
            dispatch({
                type: 'commentFailed',
                payload: 'Error, Could not find post'
            })
        }
      };
    
      // const handleKeyPress = (event: React.KeyboardEvent) => {
      //   if (event.keyCode === 13 || event.which === 13) {
      //     state.isButtonDisabled || handleComment();
      //   }
      // };
    
      const handleResponseChange: React.ChangeEventHandler<HTMLTextAreaElement> =
        (event) => {
          dispatch({
            type: 'setResponse',
            payload: event.target.value
          });
        }
      if (localStorage.getItem('username')) {
        return (
          <form className="commentForm" noValidate autoComplete="off" id="commentForm" onSubmit={handleComment}>
                <div>
                  <label htmlFor="messageBox">
                    <textarea placeholder="Message" form="commentForm" value={state.response} onChange={handleResponseChange}/>
                  </label>
                  <input
                    className="postButton"
                    type="submit"
                    value="comment"
                    disabled={state.isButtonDisabled}
                  />
                  <p>{state.helperText}</p>
                </div>
          </form>
        );
      } else {
        return (
          <div>
            <h3>Please login to comment</h3>
          </div>
        )
      }
}

export default CommentButton;