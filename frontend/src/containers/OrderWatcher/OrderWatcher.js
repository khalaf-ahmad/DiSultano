import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import { Spinner, Alert, Modal } from 'react-bootstrap';
import socket_io from 'socket.io-client';
import * as actions from '../../store/actions';
import CreatedDetails from '../../components/Order/OrderDetails/CreatedDetails/CreatedDetails';
import WaitingDetails from '../../components/Order/OrderDetails/WaitingDetails/WaitingDetails';

function OrderWatcher() {
  const [show_modal, set_show_modal] = useState(true);

  const dispatch = useDispatch();

  // Getting state from redux store
  const error = useSelector((state) => state.orders_details.error);
  const loading = useSelector((state) => state.orders_details.loading);

  // Mapping Store actions
  const update_detail = useCallback(
    (detail_id, state) => dispatch(actions.update_detail_state(detail_id, state)),
    [dispatch],
  );

  const fetch_orders_details = useCallback(
    () => dispatch(actions.fetch_orders_details()),
    [dispatch],
  );

  useEffect(() => {
    fetch_orders_details();
  }, [fetch_orders_details]);

  useEffect(() => {
    set_show_modal(loading);
  }, [loading]);

  const loading_spinner = (
    <Modal centered size="sm" show={show_modal} backdrop="static" keyboard={false}>
      <Modal.Body className="d-flex justify-content-center">
        <Spinner variant="info" animation="border" size="bg">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Modal.Body>
    </Modal>
  );

  const alert = (
    <Alert
      style={{
        position: 'fixed',
        top: '72px',
        zIndex: '1340',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      variant="danger"
    >
      {error}
    </Alert>
  );

  useEffect(() => {
    const socket = socket_io.connect(process.env.REACT_APP_BASE_URL);
    socket.on('fetch_details', (data) => {
      fetch_orders_details();
    });

    // clean up connection
    return () => socket.disconnect();
  }, [fetch_orders_details]);

  return (
    <>
      <Col sm="6" lg="4">
        <CreatedDetails update_detail={update_detail} />
      </Col>
      <Col sm="6" lg="8">
        <WaitingDetails update_detail={update_detail} />
      </Col>
      {loading && loading_spinner}
      {error && alert}
    </>
  );
}

export default OrderWatcher;
