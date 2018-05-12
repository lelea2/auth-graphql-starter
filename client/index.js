import React from 'react';
import ReactDOM from 'react-dom';
// Set up apollo client
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import requireAuth from './components/requireAuth';
import Dashboard from './components/Dashboard';

// https://www.apollographql.com/docs/react/recipes/authentication.html
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  // Additional fetch options like `credentials` or `headers`
  credentials: 'same-origin',
});
const cache = new InMemoryCache();

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  }
};
const client = new ApolloClient({
  link,
  cache,
  defaultOptions
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="dashboard" component={requireAuth(Dashboard)} />
          <Route path="signin" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
