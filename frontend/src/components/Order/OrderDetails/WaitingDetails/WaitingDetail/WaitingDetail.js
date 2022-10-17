import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

const badge_style = {
  alignSelf: 'center',
  padding: '6px',
};

function WaitingDetail({ detail, detail_clicked }) {
  const time = detail.date_created.split(' ')[1];
  const time_array = time.split(':').slice(0, 2).join(':');
  return (
    <Card bg="white" border="success">
      <Card.Header className="text-success">
        <div className="d-flex justify-content-between">
          <h5>{detail.name}</h5>
          <Badge style={badge_style} variant="danger">
            {detail.quantity}
          </Badge>
        </div>
      </Card.Header>
      <Card.Text as="div" className="p-2">
        <div className="d-flex justify-content-between p-2">
          <Badge style={badge_style} variant="light">
            {detail.customer_name || ' '}
          </Badge>
          <Badge style={badge_style} variant="light">
            {detail.order_id}
          </Badge>
        </div>
        <div className="d-flex justify-content-between p-2">
          <div>
            <Badge style={badge_style} variant="warning">
              {detail.description}
            </Badge>
          </div>
          <span className="text-info">{time_array}</span>
        </div>
      </Card.Text>
      <Card.Footer>
        <Button className="m-auto d-block" variant="outline-primary" onClick={detail_clicked}>
          Done
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default WaitingDetail;
