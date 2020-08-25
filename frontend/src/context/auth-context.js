import React, { createContext, Component } from 'react';
import axios from '../axios-base';
import LocalStorageService from '../shared/LocalStorageService';
import { current_user, get_error_message } from '../shared/utility';
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
  resetAuth: () => { },
  clearMessage: () => {}
});

export class AuthContextProvider extends Component {
  state = { ...initialState, pause: true }
  storage = LocalStorageService.get_service();
  componentDidMount() {
    this.check_authentication();
  }
  check_authentication() {
    const refresh_token = this.storage.get_refresh_token();
    if (!refresh_token) {
      this.setState({ pause: false });
      return ;
    }
    this.setState({
      isLoading: true,
    });
    this.get_access_token(refresh_token);
  }
  clearMessage = () => {
    this.setState({ displayMessage: false });
  }
  get_access_token(refresh_token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${refresh_token}`;
    axios.post("/token/refresh").then((response) => {
      this.set_current_user(response.data.user, response.data.access_token);
      this.setState((prevState) => {
        return {
          ...prevState,
          isLoading: false,
          isAuthenticated: true,
          pause: false
        };
      });
    }).catch(error => {
      this.reset_current_user();
      this.setState({pause: false})
    });
  }
  reset = () => {
    this.storage.clear_refresh_token();
    this.reset_current_user();
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          isAuthenticated: false
        }
      });
  }

  reset_current_user = () => {
    current_user.access_token = "";
    current_user.name = "";
    current_user.role = 0;
    current_user.username = "";
    current_user.id = 0;
  }
  
  login = (user) => {
    this.send_auth_request(user, "/login");
  }

  registerUser = (user) => {
    this.send_auth_request(user, '/user');
  }

  set_current_user = (user, access_token) => {
    current_user.name = user.name;
    current_user.username = user.username;
    current_user.role = user.role;
    current_user.access_token = access_token;
    current_user.id = user.id;
  }
  
  send_auth_request = (user, url) => {
    this.setState({ displayMessage:"" ,isLoading: true, isAuthenticated: false });
    axios.post(url, user)
      .then((response) => {
      this.on_auth_success(response.data);
    })
    .catch((error) => {
      this.on_auth_fail(get_error_message(error));
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

  on_auth_success = (data) => {
    this.storage.set_refresh_token(data.token.refresh_token);
    this.set_current_user(data.user, data.token.access_token);
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
          resetAuth: this.reset,
          clearMessage: this.clearMessage
        }}
      >
        {!this.state.pause && this.props.children}
      </authContext.Provider>
    );
  }
}
export default authContext;
