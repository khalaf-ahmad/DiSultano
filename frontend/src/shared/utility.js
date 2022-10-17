class UserForm {
  constructor(elementType, elementConfig, value) {
    this.elementType = elementType;
    this.elementConfig = { ...elementConfig };
    this.value = value;
  }
}

const form = {
  name: new UserForm(
    'control',
    {
      type: 'text',
      placeholder: 'Name',
      required: true,
      minLength: 5,
      maxLength: 20,
    },
    '',
  ),
  username: new UserForm(
    'control',
    {
      type: 'text',
      placeholder: 'Username',
      required: true,
      minLength: 5,
      maxLength: 20,
    },
    '',
  ),
  password: new UserForm(
    'control',
    {
      type: 'password',
      placeholder: 'Password',
      required: true,
      minLength: 5,
    },
    '',
  ),
  confirmPassword: new UserForm(
    'control',
    {
      type: 'password',
      placeholder: 'Confirm Password',
      required: true,
      minLength: 5,
    },
    '',
  ),
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const get_error_message = (error) => {
  const error_message = error.response ? error.response.data.message : error.message;
  return JSON.stringify(error_message);
};

export const on_action_fail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: get_error_message(action.error),
  });
};

export const on_action_start = (state, action) => {
  return updateObject(state, { loading: true, error: '' });
};

export const get_product_form_data = (product) => {
  const data = new FormData();
  data.append('id', product.id);
  data.append('name', product.name);
  data.append('image', product.image_form);
  data.append('price', product.price);
  data.append('category_id', product.category.id);
  product.receivers.forEach((user) => {
    data.append('receivers', user.id);
  });
  return data;
};

export const get_order_data = (order) => {
  const details = order.details.map((detail) => {
    return {
      detail_id: detail.detail_id,
      product_id: detail.product_id,
      detail_price: detail.detail_price,
      quantity: detail.quantity,
      description: detail.description,
      created: detail.created || false,
    };
  });
  return {
    id: order.id,
    customer_name: order.customer_name,
    description: order.description,
    details,
  };
};

export const UserControls = { ...form };

export const UserLevel = { GUEST: 1, ADMIN: 2, SYS_ADMIN: 3 };

export const token = { access_token: '' };
