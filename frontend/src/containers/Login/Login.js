import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { UserControls } from '../../shared/utility';
import UserForm from '../../components/UI/UserForm/UserForm';
import AuthContext from '../../context/auth-context';

class Login extends Component {
  static contextType = AuthContext;

  state = {
    controls: {
      username: { ...UserControls.username },
      password: { ...UserControls.password },
    },
  };

  componentWillUnmount() {
    this.context.clearMessage();
  }

  changeHandler = (event) => {
    const controlName = event.target.id;
    const control = { ...this.state.controls[controlName] };
    control.value = event.target.value;

    this.setState((prevState) => {
      return {
        ...prevState,
        controls: {
          ...prevState.controls,
          [controlName]: control,
        },
      };
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: this.state.controls.username.value,
      password: this.state.controls.password.value,
    };
    this.context.login(user);
  };

  render() {
    return this.context.isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      <UserForm
        controls={this.state.controls}
        submitText={this.context.isLoading ? 'Loading...' : 'Login'}
        loading={this.context.isLoading}
        changeHandler={this.changeHandler}
        displayMessage={this.context.displayMessage}
        category={this.context.category}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Login;
