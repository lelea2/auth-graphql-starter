import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../queries/signup';
import query from '../queries/user';

class SignupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  componentWillReceiveProps(nextProps) {
    // This is not ideal
    // redirect when user is not defined initially -> signup successfully
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard');
    }
  }

  handleSubmit({email, password}) {
    this.props.mutate({
      variables: {
        email,
        password
      },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'))
      .catch((err) => {
        const errors = err.graphQLErrors.map((err) => {
          return err.message;
        });
        this.setState({ errors });
      });
  }

  render() {
    return (
      <AuthForm header="Sign Up"
        btnText="Sign Up"
        onSubmit={this.handleSubmit.bind(this)}
        errors={this.state.errors}
      />
    );
  }
}

export default graphql(mutation)(SignupForm);