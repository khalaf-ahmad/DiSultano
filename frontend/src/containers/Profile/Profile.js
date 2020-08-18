import React, { Component } from "react";
import { UserControls, current_user, get_error_message } from "../../shared/utility";
import UserForm from "../../components/UI/UserForm/UserForm";
import axios from '../../axios-base';


class Profile extends Component {
  state = {
    controls: {
      name: { ...UserControls.name, value: current_user.name },
      password: {
        ...UserControls.password,
        elementConfig: {
          ...UserControls.password.elementConfig,
          placeholder: "New Password",
        },
      },
      confirmPassword: { ...UserControls.confirmPassword },
    },
    displayMessage: "",
    category: "",
    isLoading: false,
  };

  changeHandler = (event) => {
    const controlName = event.target.id;
    const control = { ...this.state.controls[controlName] };
    control.value = event.target.value;

    this.setState((prevState) => {
      return {
        displayMessage: "",
        category: "",
        controls: {
          ...prevState.controls,
          [controlName]: control,
        },
      };
    });
  };
  displayMessage = (message) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        displayMessage: message,
        category: "danger",
      };
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.formIsValid()) {
      return;
    }
    const user = {
      name: this.state.controls["name"].value,
      username: current_user.username,
      password: this.state.controls["password"].value,
      role: current_user.role,
      activated: true,
      id: current_user.id
    };
    this.setState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
        category: "",
        displayMessage: ""
      }
    })
    this.update_user(user);
  };

  update_user = (user) => {
    axios.put("/user", user).then((response) => {
      this.set_current_user(response.data.user);
      this.setState((prevState) => ({
        ...prevState,
        displayMessage: response.data.message,
        isLoading: false,
        category: "success"
      }));
    })
    .catch(error => {
      this.setState((prevState) => {
        return {
          ...prevState,
          isLoading: false,
          displayMessage: get_error_message(error),
          category: "danger",
        };
      })
    })
  };
  set_current_user = (user) => {
    current_user.name = user.name;
    current_user.username = user.username;
    current_user.role = user.role;
    current_user.id = user.id
  };

  formIsValid = () => {
    const password = this.state.controls["password"].value;
    const confirmPassword = this.state.controls["confirmPassword"].value;
    if (password !== confirmPassword) {
      this.displayMessage("Passwords didn't match.");
      return false;
    }
    return true;
  };

  render() {
    return (
      <UserForm
        controls={this.state.controls}
        submitText={this.state.isLoading ? "Loading..." : "Update"}
        loading={this.state.isLoading}
        changeHandler={this.changeHandler}
        displayMessage={this.state.displayMessage}
        category={this.state.category}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Profile;
