import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../js_functions/login';

/*
    Routes to Component using info in ...rest so long as user is logged in, otherwise routes back to login page
*/



const PrivateRoute = ({component: Component, path} : {
    component: any,
    path: string
}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route exact {...path} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;