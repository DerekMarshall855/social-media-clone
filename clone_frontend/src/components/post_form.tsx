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

  const handleMessageChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setMessage',
        payload: event.target.value
      });
    }
  if (localStorage.getItem('username')) {
    return (
      <form className="postForm" noValidate autoComplete="off">
          <h3>Write Posts Here</h3>
            <div>
              <input
                type="text"
                placeholder="Message"
                onChange={handleMessageChange}
                //onKeyPress={handleKeyPress} // Was casuing errors by uploadings posts twice
              />
              <p>{state.helperText}</p>
            </div>

            <button
              className="postButton"
              onClick={handlePost}
              disabled={state.isButtonDisabled}>
              Post
            </button>

      </form>
    );
  } else {
    return (
      <div>
        <h2>Please login to make a post</h2>
      </div>
    )
  }

}

export default Post;