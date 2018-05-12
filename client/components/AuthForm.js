import React, { Component } from 'react';

class AuthForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleOnChange(e, type) {
    const obj = {};
    obj[type] = e.target.value;
    this.setState(obj);
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
  }

  render() {
    console.log(this.props);
    return (
      <div className="row">
        <form className="col s4" onSubmit={this.onSubmit.bind(this)}>
          <h3>{this.props.header}</h3>
          <div className="input-field">
            <label>Email</label>
            <input id="email"
              type="text"
              value={this.state.email}
              onChange={(e) => this.handleOnChange(e, 'email')}
            />
          </div>
          <div className="input-field">
            <label>Password</label>
            <input id="password"
              type="password"
              value={this.state.password}
              onChange={(e) => this.handleOnChange(e, 'password')}
            />
          </div>
          <div className="errors">
            {this.props.errors && this.props.errors.map((err) => {
              return <div key={err}>{err}</div>
            })}
          </div>
          <button className="btn" type="submit">{this.props.btnText}</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
