import React from 'react';
import { Card, Badge } from 'react-bootstrap';

function Order({ order, card_clicked }) {
  return (
    <Card border="warning" onClick={card_clicked} role="button">
      <Card.Header className="bg-danger position-relative p-3">
        <span className="text-warning ">{order.customer_name}</span>
        <Badge
          pill
          variant="warning"
          style={{
            position: 'absolute',
            right: '5px',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '6px',
          }}
        >
          {order.id}
        </Badge>
      </Card.Header>
      <Card.Body>
        <Card.Text as="div" style={{ fontSize: '.7rem' }}>
          <span className="d-block text-muted">{order.date_created}</span>
          <span className="d-block text-info">{order.description}</span>
          <div className="d-flex justify-content-end mt-2">
            <Badge pill variant="danger" className="p-2 ml-2" style={{ fontSize: '.8rem' }}>
              {(+order.total_price.toFixed(2)).toLocaleString()}
            </Badge>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Order;
