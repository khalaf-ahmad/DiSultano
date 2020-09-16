import React, { createContext, Component } from 'react';
import axios from '../axios-base';
import LocalStorageService from '../shared/LocalStorageService';
import { get_error_message } from '../shared/utility';
import {token} from '../shared/utility';

const initial_user = {
  name: "",
  username: "",
  role: 0,
  id: 0,
};

const initial_state = {
  isLoading: false,
  displayMessage: "",
  category: "danger",
  isAuthenticated: false,
  user: {...initial_user}
};

const authContext = createContext({
  ...initial_state,
  login: () => {},
  registerUser: () => {},
  resetAuth: () => {},
  clearMessage: () => { },
  update_user_info: () => {}
});

export class AuthContextProvider extends Component {
  state = { ...initial_state, pause: true };

  storage = LocalStorageService.get_service();

  componentDidMount() {
    this.authenticate();
  }

  authenticate() {
    const refresh_token = this.storage.get_refresh_token();
    if (!refresh_token) {
      this.setState({ pause: false });
      return;
    }
    this.setState({
      isLoading: true,
    });
    this.get_access_token(refresh_token);
  }

  get_access_token(refresh_token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${refresh_token}`;
    axios.post("/token/refresh")
    .then((response) => {
      const user = { ...response.data.user };
      token.access_token = response.data.access_token;
      this.setState((prev_state) => {
        return {
          ...prev_state,
          isLoading: false,
          isAuthenticated: true,
          pause: false,
          user
        };
      });
    })
    .catch((error) => {
      this.reset_current_user();
      this.setState({ pause: false });
    });
  }

  clearMessage = () => {
    this.setState({ displayMessage: false });
  };

  reset = () => {
    this.storage.clear_refresh_token();
    this.reset_current_user();
    this.setState((prev_state) => {
      return {
        ...prev_state,
        isAuthenticated: false,
      };
    });
  };

  reset_current_user = () => {
    token.access_token = "";
    this.setState((prev_state) => {
      return {
        ...prev_state,
        user: { ...initial_user },
      };
    });
  };

  login = (user) => {
    this.send_auth_request(user, "/login");
  };

  registerUser = (user) => {
    this.send_auth_request(user, "/user");
  };

  update_user_info = user => {
    this.setState(prev_state => {
      return {
        ...prev_state,
        user: { ...prev_state.user, ...user }
      }
    });
  }

  send_auth_request = (user, url) => {
    this.setState({
      displayMessage: "",
      isLoading: true,
      isAuthenticated: false,
    });
    axios.post(url, user)
    .then((response) => {
      this.on_auth_success(response.data);
    })
    .catch((error) => {
      this.on_auth_fail(get_error_message(error));
    });
  };

  on_auth_fail = (error_message) => {
    this.setState((prev_state) => {
      return {
        ...prev_state,
        ...initial_state,
        displayMessage: error_message,
      };
    });
  };

  on_auth_success = (data) => {
    this.storage.set_refresh_token(data.token.refresh_token);
    this.update_user_info(data.user);
    token.access_token = data.token.access_token;
    this.setState((prev_state) => {
      return {
        ...prev_state,
        displayMessage: "",
        category: "",
        isAuthenticated: true,
        isLoading: false
      };
    });
  };

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
          resetAuth: this.reset,
          clearMessage: this.clearMessage,
          user: this.state.user,
          update_user_info: this.update_user_info
        }}
      >
        {!this.state.pause && this.props.children}
      </authContext.Provider>
    );
  }
}
export default authContext;
