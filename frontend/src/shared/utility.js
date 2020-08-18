
class UserForm {
  constructor(elementType, elementConfig, value){
    this.elementType = elementType;
    this.elementConfig = { ...elementConfig };
    this.value = value;
  }
}

const form = {
  name:  new UserForm("control",
    {
      type: "text",
      placeholder: "Name",
      required: true,
      minLength: 5,
      maxLength: 20,
    }, ""),
  username: new UserForm("control",
    {
      type: "text",
      placeholder: "Username",
      required: true,
      minLength: 5,
      maxLength: 20,
    }, ""),
  password: new UserForm("control",{
    type: "password",
    placeholder: "Password",
    required: true,
    minLength: 5,
    }, ""),
  confirmPassword: new UserForm("control",{
    type: "password",
    placeholder: "Confirm Password",
    required: true,
    minLength: 5,
    }, "")
};

export const current_user = {
  name: "",
  username: "",
  role: 0,
  access_token: "",
  id: 0
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const get_error_message = (error) => {
  return error.response? error.response.data.message : error.message
}

export  const UserControls = {...form};