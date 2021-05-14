import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../js_functions/login';

import Home from '../pages/home';
/*
    Routes to Component unless it is considered restricted, then it will route to home
        Currently no restricted components, but this allows to expand admin tools later
*/

const PublicRoute = ({component: Component, path} : {
    component: any,
    path: string
}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route exact {...path} render={props => (
            !isLogin() ?
                <Component {...props} />
            : <Redirect to="/home"/>
        )} />
    );
};

export default PublicRoute;