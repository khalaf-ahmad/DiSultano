import React from 'react';
import { Card } from 'react-bootstrap';

const Order = ({ order, card_clicked }) => {
  return (
    <Card border="warning" onClick={card_clicked} role="button">
      <Card.Header className="text-warning font-weight-bold bg-danger">
        {order.customer_name}
      </Card.Header>
      <Card.Body>
        <Card.Text className="font-weight-light">
          <span className="d-block text-muted">{order.date_created}</span>
          <span className="text-info">{order.description}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Order;
