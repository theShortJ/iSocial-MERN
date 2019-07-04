import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import RoutesContainer from './components/routing/RoutesContainer';
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
            <Switch>
              <Route exact path = '/' component = {Landing} />
              <Route component = {RoutesContainer}/>
            </Switch>
          </Fragment>
        </Router>
      </Provider>
  );
};

export default App;
