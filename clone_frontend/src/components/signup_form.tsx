import React, { useReducer, useEffect } from 'react';
import api from '../api/user_api';

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
    signupBtn: {
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
  password:  string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  username: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'signupSuccess', payload: string }
  | { type: 'signupFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername': 
      return {
        ...state,
        username: action.payload
      };
    case 'setPassword': 
      return {
        ...state,
        password: action.payload
      };
    case 'setIsButtonDisabled': 
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'signupSuccess': 
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'signupFailed': 
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

const Signup = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.username.trim() && state.password.trim()) { // If password and username have input (not spaces)
        if (state.username.indexOf(' ') >= 0 || state.password.indexOf(' ') >= 0) { // Does not allow spaces in password or username (Trims from end for username)
            dispatch({
                type: 'setIsButtonDisabled',
                payload: true
            });
        } else {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: false
            });
        }
    } else {
        dispatch({
            type: 'setIsButtonDisabled',
            payload: true
        });
    }
  }, [state.username, state.password]);

  //Change this to use DB
  const handleSignup = async () => {

    var obj = JSON.parse(`{"username":"${state.username}", "password":"${state.password}"}`);

    try {
        await api.getUserByName(obj.username).then(res => { //Called on username already exists
            dispatch({
                type: 'signupFailed',
                payload: 'Username is already taken'
            })
        })
    } catch {  // Username does not exist, attempt to create new user
        try {
            await api.createUser(obj).then(res => {
                dispatch({
                    type: 'signupSuccess',
                    payload: 'Signup Successful - User has been created'
                })
            })
        } catch {
            dispatch({
                type: 'signupFailed',
                payload: 'Error, User not created'
            })
        }

    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleSignup();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setUsername',
        payload: event.target.value
      });
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setPassword',
        payload: event.target.value
      });
    }
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Signup Form" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="username"
              type="email"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.signupBtn}
            onClick={handleSignup}
            disabled={state.isButtonDisabled}>
            Signup
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default Signup;