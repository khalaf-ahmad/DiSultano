import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../../store/actions';
import OrderDetails from '../../../../components/Order/OrderDetails/Details/Details';
import DetailForm from '../../../../components/Order/OrderDetails/DetailForm/DetailForm';

const initial_product = { id: 0, name: '', price: 0, image: '' };

const iniial_order_detail = {
  detail_id: 0,
  detail_price: 0,
  description: '',
  quantity: 1,
  product: { ...initial_product },
};

const get_initial_detail = () => ({ ...iniial_order_detail });

function DetailsInfo(props) {
  const [show_detail_modal, set_detail_modal] = useState(false);
  const [order_detail, set_order_detail] = useState(get_initial_detail());

  const dispatch = useDispatch();

  // Mapping Store Actions to component functions
  const delete_detail = useCallback((index) => dispatch(actions.remove_detail(index)), [dispatch]);

  const update_detail = useCallback(
    (detail) => dispatch(actions.update_detail(detail)),
    [dispatch],
  );

  // Open and Close Functions for Detail Form Modal
  const handleCloseDetailModal = useCallback(() => {
    set_detail_modal(false);
    set_order_detail(get_initial_detail());
  }, []);

  const handleShowDetailModal = useCallback(() => set_detail_modal(true), []);

  // show detail form when select detail
  const on_detail_click = useCallback(
    (detail) => {
      set_order_detail({ ...detail });
      handleShowDetailModal();
    },
    [handleShowDetailModal],
  );

  // update detail when change occurs
  const update_detail_info = (event) => {
    const property = event.target.name;
    let { value } = event.target;
    if (property === 'quantity' || property === 'detail_price') {
      value = +value;
    }
    const new_detail = { ...order_detail, [property]: value };
    set_order_detail(new_detail);
  };

  const order_detail_form = (
    <DetailForm
      update_detail={update_detail}
      order_detail={order_detail}
      show_detail_modal={show_detail_modal}
      handleCloseDetailModal={handleCloseDetailModal}
      update_detail_info={update_detail_info}
    />
  );

  return (
    <>
      <OrderDetails
        details={props.details}
        delete_detail={delete_detail}
        on_detail_click={on_detail_click}
      />
      {show_detail_modal && order_detail_form}
    </>
  );
}

export default DetailsInfo;
