import React from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { AiOutlineSwitcher } from 'react-icons/ai'

const CreatedDetail = ({ detail, detail_clicked }) => {
  return (
    <ListGroupItem as="li" action variant="info">
      <div className="d-flex justify-content-between">
        <span>{detail.name}</span>
        <span className="text-muted">{detail.customer_name}</span>
        <AiOutlineSwitcher
          role="button"
          className="text-danger"
          size="32px"
          onClick={detail_clicked}
        />
      </div>
    </ListGroupItem>
  );
};

export default CreatedDetail;
