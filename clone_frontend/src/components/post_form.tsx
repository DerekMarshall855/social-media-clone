import React, { useReducer, useEffect } from 'react';
import api from '../api/post_api';

// Use these styles for now, do sass later instead
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    postBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

//state type
type State = {
  username: string
  message:  string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  username: "",
  message: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false
};

type Action = { type: 'setUsername', payload: string }
  | { type: 'setMessage', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'postSuccess', payload: string }
  | { type: 'postFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername': 
      return {
        ...state,
        username: action.payload
      };
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
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.username.trim() && state.message.trim()) { // Cuts trailing spaces
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
  }, [state.username, state.message]);

  //Change this to use DB
  const handlePost = async () => {
    var obj = JSON.parse(`{"username":"${state.username}",
                            "message":"${state.message}",
                            "comments":[
                                {
                                    "name":"",
                                    "response":""
                                }
                            ]}`);
    
    console.log(obj);

    try {
        await api.createPost(obj).then(res => { //Called on successful creation
            dispatch({
                type: 'postSuccess',
                payload: 'Post Successful'
            })
            //Refresh/update home page
        })
    } catch {
        dispatch({
            type: 'postFailed',
            payload: 'Error, Post failed'
        })
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handlePost();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setUsername',
        payload: event.target.value
      });
    };

  const handleMessageChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setMessage',
        payload: event.target.value
      });
    }
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Post Form" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="username"
              type="text"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="message"
              type="text"
              label="Message"
              placeholder="Message"
              margin="normal"
              helperText={state.helperText}
              onChange={handleMessageChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.postBtn}
            onClick={handlePost}
            disabled={state.isButtonDisabled}>
            Post
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default Post;