/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import ReactGA from 'react-ga';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.js';
import Index from '../../ui/containers/Index.js';
import Popular from '../../ui/pages/Popular.js';
import Favorites from '../../ui/pages/Favorites.js';
import Submissions from '../../ui/pages/Submissions.js';
import SubmitProject from '../../ui/containers/SubmitProject.js';
import Login from '../../ui/pages/Login.js';
import NotFound from '../../ui/pages/NotFound.js';
import RecoverPassword from '../../ui/pages/RecoverPassword.js';
import ResetPassword from '../../ui/pages/ResetPassword.js';
import Signup from '../../ui/pages/Signup.js';

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

let logPageView = () => {};

if (Meteor.isProduction) {
  ReactGA.initialize('UA-55125549-7');

  logPageView = () => {
    const page = window.location.pathname;
    ReactGA.set({ page });
    ReactGA.pageview(page);
  };
}

Meteor.startup(() => {
  render(
    <Router history={ browserHistory } onUpdate={ logPageView }>
      <Route path="/" component={ App }>
        <IndexRedirect to="latest" />
        <Route name="latest" path="/latest" component={ Index } />
        <Route name="popular" path="/popular" component={ Popular } />
        <Route name="favorites" path="/favorites" component={ Favorites } onEnter={ authenticate } />
        <Route name="submissions" path="/submissions" component={ Submissions } onEnter={ authenticate } />
        <Route name="submit" path="/projects/submit" component={ SubmitProject } onEnter={ authenticate } />
        <Route name="submit" path="/projects/:projectId" component={ SubmitProject } onEnter={ authenticate } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
