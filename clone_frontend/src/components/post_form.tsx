import React, { useReducer, useEffect } from 'react';
import api from '../api/post_api';

//state type
type State = {
  message:  string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  message: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false
};

type Action = { type: 'setMessage', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'postSuccess', payload: string }
  | { type: 'postFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setMessage': 
      return {
        ...state,
        message: action.payload
      };
    case 'setIsButtonDisabled': 
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'postSuccess': 
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'postFailed': 
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

const Post = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.message.trim()) { // Cuts trailing spaces
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
  }, [state.message]);

  //Change this to use DB
  const handlePost = async () => {
    var obj = JSON.parse(`{"username":"${localStorage.getItem('username')}",
                            "message":"${state.message}",
                            "comments":[
                                {
                                    "name":"",
                                    "response":""
                                }
                            ]}`);

    try {
        await api.createPost(obj).then(res => { //Called on successful creation
            dispatch({
                type: 'postSuccess',
                payload: 'Post Successful'
            })
        
        })
    } catch {
        dispatch({
            type: 'postFailed',
            payload: 'Error, Post failed'
        })
    }
  };

  const handleMessageChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    (event) => {
      dispatch({
        type: 'setMessage',
        payload: event.target.value
      });
    }
  if (localStorage.getItem('username')) {
    return (
      <form className="form" noValidate autoComplete="off" id="postForm" onSubmit={handlePost}>
          <h3>Write Posts Here</h3>
            <div>
              <label htmlFor="MessageBox">
                <textarea placeholder="Message" form="postForm" value={state.message} onChange={handleMessageChange}/>
              </label>
              <input
                className="postButton"
                type="submit"
                value="post"
                disabled={state.isButtonDisabled}
              />
              <p>{state.helperText}</p>
            </div>

      </form>
    );
  } else {
    return (
      <div>
        <h3>Please login to make a post</h3>
      </div>
    )
  }

}

export default Post;