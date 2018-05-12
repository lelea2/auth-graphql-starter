import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../queries/login';
import query from '../queries/user';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  componentWillUpdate(nextProps) {
    console.log(this.props, nextProps);
    // user not signin before but now signin
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  handleSubmit({email, password}) {
    console.log('>>> Login', this.props);
    this.props.mutate({
      variables: {
        email,
        password
      },
      refetchQueries: [{ query }]
    }).catch((res) => {
        console.log(res.graphQLErrors); //errors object published by Apollo Client
        const errors = res.graphQLErrors.map((err) => {
          return err.message;
        });
        this.setState({
          errors
        });
      });
  }

  render() {
    return (
      <AuthForm header="Sign In"
        btnText="Sign In"
        onSubmit={this.handleSubmit.bind(this)}
        errors={this.state.errors}
      />
    );
  }
}

// Racing issue concern, tie currentUser query with login form
export default graphql(mutation)(
  graphql(query)(LoginForm)
);