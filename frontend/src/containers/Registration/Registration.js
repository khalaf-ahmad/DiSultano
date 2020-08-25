import React,{ Component } from 'react';
import UserForm from "../../components/UI/UserForm/UserForm";
import { UserControls } from '../../shared/utility';
import AuthContext from '../../context/auth-context';

class Registration extends Component {
  static contextType = AuthContext;

  state = {
    controls: UserControls,
    displayMessage: "",
    category: ""
  };
  componentDidMount() {
    this.context.resetAuth();
  }
  componentWillUnmount() {
    this.context.clearMessage();
  }
  changeHandler = (event) => {
    const controlName = event.target.id;
    const control = { ...this.state.controls[controlName] };
    control.value = event.target.value;

    this.setState((prevState) => {
      return {
        displayMessage: "",
        category:"",
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
        category: "danger"
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
      username: this.state.controls["username"].value,
      password: this.state.controls["password"].value,
    };
    this.context.registerUser(user);
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
    return  <UserForm
      controls={this.state.controls}
      submitText={this.context.isLoading ? "Loading..." : "Sign Up"}
      loading={this.context.isLoading}
      changeHandler={this.changeHandler}
      displayMessage={this.state.displayMessage || this.context.displayMessage}
      category={this.state.category || this.context.category}
      handleSubmit={this.handleSubmit}
    />;
  }
}

export default Registration;
