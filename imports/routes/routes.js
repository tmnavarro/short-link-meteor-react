import {Meteor} from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';

const unathenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
const onEnterPublicPage = (() => {
  if(Meteor.userId()) {
    browserHistory.push('/links');
  }
});
const onEnterPrivatePage = (() => {
  if(!Meteor.userId()) {
    browserHistory.push('/');
  }
});

export const onAuthChange = (isAuthenticated) => {
  const pathName = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unathenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.push('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.push('/');
  }
}

export const routes = (
  <Router history={browserHistory}>
    <Route exact path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound} onEnter={onEnterPrivatePage}/>
  </Router>
);
