import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const Order = ({ order, card_clicked }) => {
  return (
    <Card border="warning" onClick={card_clicked} role="button">
      <Card.Header className="bg-danger d-flex justify-content-between">
        <span className="text-warning font-weight-bold ">
          {order.customer_name}
        </span>
        <Badge pill variant="warning" className="p-2">
          {order.id}
        </Badge>
      </Card.Header>
      <Card.Body>
        <Card.Text as='div' className="font-weight-light">
          <span className="d-block text-muted">{order.date_created}</span>
          <span className="d-block text-info">{order.description}</span>
          <div className="d-flex justify-content-end mt-2">
            <Badge pill variant="danger" className="p-2 ml-2 ">
              {(+order.total_price.toFixed(2)).toLocaleString()}
            </Badge>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Order;
