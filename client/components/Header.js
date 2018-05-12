import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/user';
import logout from '../queries/logout';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout() {
    this.props.mutate({
      refetchQueries: [{ query }] // update queries
    });
  }

  renderBtn(user) {
    if (user) {
      return (
        <ul className="right">
          <li><a onClick={this.handleLogout.bind(this)}>Log Out</a></li>
        </ul>
      );
    } else {
      return (
        <ul className="right">
          <li><Link to="/signin">Log In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      );
    }
  }

  render() {
    const { data } = this.props;
    const { loading, user } = data;
    console.log(data);
    return (loading) ? (<div></div>) : (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          {this.renderBtn(user)}
        </div>
      </nav>
    );
  }
}

export default graphql(logout)(
  graphql(query)(Header)
);