import React from 'react';
import { useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import CreatedDetail from '../../../components/CreatedDetail/CreatedDetail';

const CreatedDetails = (props) => {

  // Getting created details from redux store
  const created_details = useSelector(state => state.orders_details.created);

  return (
    <React.Fragment>
      <h3 className='text-center text-info bg-warning p-2'>HISTORY</h3>
      <ListGroup as="ul" className="font-weight-bold">
        {created_details.map((detail) => (
          <CreatedDetail
            detail={detail}
            key={detail.detail_id}
            detail_clicked={() => props.update_detail(detail.detail_id, false)}
            />
        ))}
      </ListGroup>
    </React.Fragment>
  );
}

export default CreatedDetails;
