import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//Pages
import Home from '../pages/home';
import Login from '../pages/login';
import AccountDetails from '../pages/account_details';
import Signup from '../pages/signup';
import NotFoundPage from '../pages/not_found';


// Components
import Header from './header';
import NavBar from './navbar';
import Footer from './footer';


const Main = () => {
    return (
        <Router>
            <Header />
            <NavBar />
            <hr/>
                <div className="page">
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/account_details" component={AccountDetails} />
                        <Route exact path="/signup" component={Signup} />
                        <Route path="/404" component={NotFoundPage} />
                        <Redirect to="/404" />
                    </Switch>
                </div>
            <hr/>
            <Footer />
        </Router>
    )
}

export default Main;