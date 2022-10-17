import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdClear } from 'react-icons/md';

function OrderDetails({ details, on_detail_click, delete_detail }) {
  return (
    <ListGroup
      style={{ maxHeight: '250px', overflow: 'auto' }}
      className="border-bottom mb-2"
      variant="flush"
    >
      {details.map((detail, idx) => {
        return (
          <ListGroup.Item
            onDoubleClick={() => on_detail_click(detail)}
            action
            key={idx}
            className="d-flex flex-wrap justify-content-between"
          >
            <span className="text-success">
              {`${detail.quantity}/ ${(+detail.detail_price.toFixed(3)).toLocaleString()}`}
            </span>
            <span className="text-info lead">{detail.product.name}</span>
            {detail.description ? (
              <span className="text-muted font-italic">{detail.description}</span>
            ) : (
              ''
            )}

            <MdClear color="red" onClick={() => delete_detail(idx)} />
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

export default React.memo(OrderDetails);
