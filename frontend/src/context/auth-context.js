import React, { createContext, Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../axios-base';
import LocalStorageService from '../shared/LocalStorageService';
import { current_user } from '../shared/utility';
const initialState = {
  isLoading: false,
  displayMessage: "",
  category: "danger",
  isAuthenticated: false
};

const authContext = createContext({
  ...initialState,
  login: () => { },
  registerUser: () => { },
  resetAuth: () => {},
});

export class AuthContextProvider extends Component {
  state = { ...initialState }
  storage = LocalStorageService.get_service()
  componentDidMount() {
    this.check_authentication();
  }
  check_authentication() {
    const refresh_token = this.storage.get_refresh_token();
    if (!refresh_token) {
      return ;
    }
    this.setState({
      isLoading: true,
    });
    this.get_access_token(refresh_token);
  }
  get_access_token(refresh_token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${refresh_token}`;
    axios.post("/token/refresh").then((response) => {
      current_user.access_token = response.data.access_token;
      this.setState((prevState) => {
        return {
          ...prevState,
          isLoading: false,
          isAuthenticated: true,
        };
      });
    });
  }
  reset = () => {
    this.storage.clear_refresh_token();
    current_user.access_token = "";
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          isAuthenticated: false
        }
      });
  }

  login = (user) => {
    this.send_auth_request(user, "/login");
  }

  registerUser = (user) => {
    this.send_auth_request(user, '/user');
  }

  send_auth_request = (user, url) => {
    this.setState({ displayMessage:"" ,isLoading: true, isAuthenticated: false });
    axios.post(url, user)
    .then((response) => {
      this.on_auth_success(response.data.token);
    })
    .catch((error) => {
      this.on_auth_fail(error.response? error.response.data.message : error.message);
    });
  }

  on_auth_fail = (error_message) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        ...initialState,
        displayMessage: error_message,
      };
    });
  }

  on_auth_success = (token) => {
    current_user.access_token = token.access_token;
    this.storage.set_refresh_token(token.refresh_token);
    this.setState((prevState) => {
      return {
        ...prevState,
        ...initialState,
        displayMessage: "",
        category: "",
        isAuthenticated: true,
      };
    });
  }

  render() {
    return (
      <authContext.Provider
        value={{
          isAuthenticated: this.state.isAuthenticated,
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
