import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import Dashboard from '../dashboard/Dashboard';
import ProfileForm from '../forms/CreateProfile';
import EditProfile from '../forms/EditProfile';
import AddExperience from '../forms/AddExperience';
import AddEducation from '../forms/AddEducation';
import PrivateRoute from './PrivateRoute';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';

const RoutesContainer = () => {
    return (
        <Fragment>
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path = '/profiles' component = {Profiles} />
                <Route exact path = '/login' component = {Login} />
                <Route exact path = '/register' component = {Register} />
                <Route exact path = '/profile/:id' component={Profile} />
                <PrivateRoute exact path = '/dashboard' component = {Dashboard} />
                <PrivateRoute exact path = '/create-profile' component = {ProfileForm} />
                <PrivateRoute exact path = '/edit-profile' component = {EditProfile} />
                <PrivateRoute exact path = '/add-experience' component = {AddExperience} />
                <PrivateRoute exact path = '/add-education' component = {AddEducation} />
                <Route component = {NotFound} />
              </Switch>
            </section>
        </Fragment>
    )
}

export default RoutesContainer;