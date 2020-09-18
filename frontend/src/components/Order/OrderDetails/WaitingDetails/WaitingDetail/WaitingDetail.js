import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

const WaitingDetail = ({ detail, detail_clicked }) => {
  const time = detail.date_created.split(" ")[1];
  const time_array = time.split(":").slice(0, 2).join(":");
  return (
    <Card bg="white" border="success">
      <Card.Header className="text-success">
        <div className="d-flex justify-content-between position-relative">
          <h5>{detail.name}</h5>
          <Badge
            style={{
              position: "absolute",
              right: "5px",
              top: "50%",
              transform: "translateY(-50%)",
              padding: "6px",
            }}
            pill
            variant="danger"
          >
            {detail.order_id}
          </Badge>
        </div>
      </Card.Header>
      <Card.Text as="div" className="p-2">
        <span>{detail.customer_name}</span>
        <div className="d-flex justify-content-between">
          <span className="text-muted">{detail.description}</span>
          <span className="text-info">{time_array}</span>
        </div>
      </Card.Text>
      <Card.Footer>
        <Button
          className="m-auto d-block"
          variant="outline-primary"
          onClick={detail_clicked}
        >
          Done
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default WaitingDetail;
