import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Form } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import UsersModal from './UsersModal/UsersModal';
import { fetch_users_initiate } from '../../../store/actions/users';
import ProductFormControls from './ProductFormControls/ProductFormControls';
import QuestionModal from '../../UI/QuestionModal/QuestionModal';

function ProductForm(props) {
  // State
  const [show_user_modal, set_show_modal] = useState(false);
  const [product_recievers, set_recievers] = useState([]);
  const [user_list, set_user_list] = useState([]);
  const [show_delete_modal, set_delete_modal] = useState(false);

  const dispatch = useDispatch();

  // Getting State from redux store
  const users = useSelector((state) => state.users.users);

  // Mapping redux actions to functions
  const fetch_users = useCallback(() => dispatch(fetch_users_initiate()), [dispatch]);

  const handle_close = () => set_show_modal(false);
  const handleShow = () => set_show_modal(true);

  const user_search = (user_list, value) => {
    const result = user_list.filter(
      (usr) => usr.name.toLowerCase().indexOf(value.toLowerCase()) >= 0,
    );
    return result.length ? result : user_list;
  };

  const handle_receiver_search = (event) => {
    const result = user_search(props.product.receivers, event.target.value);
    set_recievers(result);
  };

  const handle_user_search = (event) => {
    const result = user_search(users, event.target.value);
    set_user_list(result);
  };

  const handle_delete_product = () => {
    props.delete_product();
    set_delete_modal(false);
  };

  const handle_submit = (event) => {
    event.preventDefault();
    if (props.product.id === 0) {
      props.add_product();
    } else {
      props.update_product();
    }
    props.clear_form();
  };

  const handle_image_changed = (event) => {
    const new_image = event.target.files[0];
    props.set_product((prevState) => {
      return {
        ...prevState,
        image_form: new_image,
      };
    });
  };

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  useEffect(() => {
    set_recievers([...props.product.receivers]);
  }, [props.product.receivers]);

  useEffect(() => {
    fetch_users();
  }, [fetch_users]);

  useEffect(() => {
    set_user_list(users);
  }, [users]);

  const users_control = (
    <UsersModal
      text_changed={handle_user_search}
      show={show_user_modal}
      on_close={handle_close}
      users={user_list}
      add_clicked={props.add_receiver}
    />
  );

  const delete_modal = (
    <QuestionModal
      show={show_delete_modal}
      submit_clicked={handle_delete_product}
      title={`Deleting Product ${props.product.name}`}
      close_clicked={() => set_delete_modal(false)}
    />
  );

  return (
    <Form as={Col} className="mt-2">
      {users_control}
      {delete_modal}
      <ProductFormControls
        product={props.product}
        handleShow={handleShow}
        clear_clicked={props.clear_form}
        delete_product_clicked={() => set_delete_modal(true)}
        input_changed={props.input_changed}
        submit_clicked={handle_submit}
        disable_update={props.disable_update}
        image_changed={handle_image_changed}
        product_recievers={product_recievers}
        delete_receiver={props.delete_receiver}
        handle_receiver_search={handle_receiver_search}
      />
    </Form>
  );
}

export default ProductForm;
