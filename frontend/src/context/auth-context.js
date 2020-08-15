import React, { createContext, Component } from 'react';
import axios from '../axios-base';

const initialState = {
  token: "",
  refreshToken: "",
  isLoading: false,
  displayMessage: "",
  category: "danger",
};
const authContext = createContext({
  ...initialState,
  login: () => { },
  registerUser: () => { },
  resetAuth: () => {},
});

export class AuthContextProvider extends Component {
  state = { ...initialState }

  reset = () => {
    this.setState(
      (prevState) => {
        return {
          ...initialState
        }
      });
  }
  login = (user) => {
    this.setState({ displayMessage: "", isLoading: true });
    axios
      .post("/login", user)
      .then((response) => {
        this.setState((prevState) => {
          return {
            ...initialState,
            token: response.data.token,
            refreshToken: response.data.refreshToken,
            displayMessage: response.data.message,
            category: "success",
          };
        });
      })
      .catch((error) => {
        this.setState((prevState) => {
          return {
            ...initialState,
            displayMessage: error.response.data.message,
          };
        });
      });
  }
  registerUser = (user) => {
    this.setState({ isLoading: true });
    axios
    .post("/user", user)
    .then((response) => {
      this.setState((prevState) => {
        return {
          ...initialState,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          displayMessage: response.data.message,
          category: "success",
        };
      });
    })
    .catch((error) => {
      this.setState((prevState) => {
        return {
          ...initialState,
          displayMessage: error.response.data.message,
        };
      });
    });
  }
  render() {
    return (
      <authContext.Provider
        value={{
          token: this.state.token,
          refreshToken: this.state.refreshToken,
          isLoading: this.state.isLoading,
          displayMessage: this.state.displayMessage,
          category: this.state.category,
          login: this.login,
          registerUser: this.registerUser,
          resetAuth: this.reset
        }}
      >
        {this.props.children}
      </authContext.Provider>
    );
  }
}

export default authContext;
