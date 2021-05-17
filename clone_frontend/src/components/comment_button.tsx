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
        console.log(obj);
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
    
      const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
          state.isButtonDisabled || handleComment();
        }
      };
    
      const handleResponseChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
          dispatch({
            type: 'setResponse',
            payload: event.target.value
          });
        }
      if (localStorage.getItem('username')) {
        return (
          <form className="postForm" noValidate autoComplete="off">
                <div>
                  <input
                    type="text"
                    placeholder="Message"
                    onChange={handleResponseChange}
                    onKeyPress={handleKeyPress}
                  />
                  <p>{state.helperText}</p>
                </div>
    
                <button
                  className="commentButton"
                  onClick={handleComment}
                  disabled={state.isButtonDisabled}>
                  {children}
                </button>
    
          </form>
        );
      } else {
        return (
          <div>
            <h2>Must be logged in to comment</h2>
          </div>
        )
      }
}

export default CommentButton;