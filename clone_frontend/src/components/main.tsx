import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//Pages
import Home from '../pages/home';
import Login from '../pages/login';
import Logout from '../pages/logout';
import AccountDetails from '../pages/account_details';
import Signup from '../pages/signup';
import NotFoundPage from '../pages/not_found';


// Components
import Header from './header';
import NavBar from './navbar';
import Footer from './footer';

// Route Types
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';


const Main = () => {
    return (
        <Router>
            <Header />
            <NavBar />
            <hr/>
                <div className="page">
                    <Switch>
                        <Route component={Home} path="/home" />
                        <PublicRoute component={Login} path="/login" />
                        <PrivateRoute component={AccountDetails} path="/account_details" />
                        <PublicRoute component={Signup} path="/signup" />
                        <PrivateRoute component={Logout} path="/logout" />
                        <Route component={NotFoundPage} path="/404" exact />
                        <Redirect to="/404" />
                    </Switch>
                </div>
            <hr/>
            <Footer />
        </Router>
    )
}

export default Main;