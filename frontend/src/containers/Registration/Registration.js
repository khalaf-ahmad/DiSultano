import React,{ Component } from 'react';
import {Form, Button, Col, Alert } from 'react-bootstrap';
import FormControl from "../../components/UI/FormControl/FormControl";
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
    return (
      <Col xs={12} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
        {this.state.displayMessage && (
          <Alert variant={this.state.category}>
            {this.state.displayMessage}
          </Alert>
        )}
        <Form onSubmit={this.handleSubmit}>
          {Object.keys(this.state.controls).map((cKey, idx) => (
            <FormControl
              changeHandler={(event) => this.changeHandler(event)}
              control={this.state.controls[cKey]}
              name={cKey}
              key={cKey + idx}
            />
          ))}
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              {this.state.isLoading ? "Loading..." : "Sign Up"}
            </Button>
          </div>
        </Form>
      </Col>
    );
  }
}

export default Registration;
