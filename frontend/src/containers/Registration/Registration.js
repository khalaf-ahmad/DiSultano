import React,{ Component } from 'react';
import UserForm from "../../components/UI/UserForm/UserForm";
import axios from '../../axios-base';
import { UserControls } from '../../shared/utility';

class Registration extends Component {
  state = {
    controls: UserControls,
    displayMessage: "",
    category: "",
    isLoading: false
  };

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
  displayMessage = (message, category = "danger") => {
    this.setState((prevState) => {
      return {
        ...prevState,
        displayMessage: message,
        category: "danger",
        isLoading: false
      };
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({displayMessage: ""})
    if (!this.formIsValid()) {
      return;
    }
    this.setState({ isLoading: true });
    const user = {
      name: this.state.controls["name"].value,
      username: this.state.controls["username"].value,
      password: this.state.controls["password"].value,
    };
    this.registerUser(user);
  }
  registerUser = (user) => {
    axios
    .post("/user", user)
    .then((response) => {
      this.setState((prevState) => {
        return {
          ...prevState,
          displayMessage: response.data.message,
          category: "success",
          isLoading: false,
        };
      });
    })
    .catch((error) => {
      this.displayMessage(error.response.data.message);
    });
  }
  formIsValid = () => {
    const password = this.state.controls["password"].value;
    const confirmPassword = this.state.controls["confirmPassword"].value;
    if (password !== confirmPassword) {
      this.displayMessage("Passwords didn't match.");
      return false;
    }
    return true;
  }

  render() {
    return <UserForm
      controls={this.state.controls}
      submitText={this.state.isLoading ? "Loading..." : "Sign Up"}
      changeHandler = {this.changeHandler}
      displayMessage={this.state.displayMessage} 
      category={this.state.category}
      handleSubmit={this.handleSubmit}
      />
  }
}

export default Registration;
