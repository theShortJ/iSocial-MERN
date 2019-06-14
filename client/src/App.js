import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import ProfileForm from './components/forms/CreateProfile';
import EditProfile from './components/forms/EditProfile';
import AddExperience from './components/forms/AddExperience';
import AddEducation from './components/forms/AddEducation';
import PrivateRoute from './components/routing/PrivateRoute';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
// React
import React, {Fragment,useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// Redux
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './util/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
      <Provider store = {store}>
        <Router>
          <Fragment>
            <Navbar/>
            <Route exact path = '/' component = {Landing} />
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path = '/profiles' component = {Profiles} />
                <Route exact path = '/login' component = {Login} />
                <Route exact path = '/register' component = {Register} />
                <Route exact path='/profile/:id' component={Profile} />
                <PrivateRoute exact path = '/dashboard' component = {Dashboard} />
                <PrivateRoute exact path = '/create-profile' component = {ProfileForm} />
                <PrivateRoute exact path = '/edit-profile' component = {EditProfile} />
                <PrivateRoute exact path = '/add-experience' component = {AddExperience} />
                <PrivateRoute exact path = '/add-education' component = {AddEducation} />
              </Switch>
            </section>
          </Fragment>
        </Router>
      </Provider>
  );
};

export default App;
