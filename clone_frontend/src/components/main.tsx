import { Switch, Route, Redirect } from 'react-router-dom';
import {ReactElement} from 'react';

//Pages
import Home from '../pages/home';
import Login from '../pages/login';
import Logout from '../pages/logout';
import AccountDetails from '../pages/account_details';
import Signup from '../pages/signup';
import NotFoundPage from '../pages/not_found';

// Route Types
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';


const Main = () : ReactElement | null => {
    return (
        <main>
            <Switch>
                <Route component={Home} path="/home" />
                <PublicRoute component={Login} path="/login" />
                <PrivateRoute component={AccountDetails} path="/account_details" />
                <PublicRoute component={Signup} path="/signup" />
                <PrivateRoute component={Logout} path="/logout" />
                <Route component={NotFoundPage} path="/404" exact />
                <Redirect to="/404" />
            </Switch>
        </main>
    )
}

export default Main;