// THIS IS HOC component, HOC is func, 

import React, { Component, WrapComponent } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import user from '../queries/user';

export default (WrapComponent) => {

  class RequiredAuth extends Component {

    constructor(props) {
      super(props);
    }

    // Update everytime data is updated
    componentWillUpdate() {
      const { user, loading } = this.props.data;
      console.log('>>>> requiredAuth', user, loading);
      if (!loading && user) {
        hashHistory.push('/signin');
      }
    }

    render() {
      return <WrapComponent {...this.props} />
    }
  }

  return graphql(user)(RequiredAuth);
}
