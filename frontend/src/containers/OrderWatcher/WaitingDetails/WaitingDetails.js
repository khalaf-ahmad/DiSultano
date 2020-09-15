import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import WaitingDetail from '../../../components/WaitingDetail/WaitingDetail';

const WaitingDetails = (props) => {

  // Getting wainting details from redux store
  const waiting_details = useSelector(state => state.orders_details.waiting);


  return (
    <React.Fragment>
      <h3 className="text-center text-warning bg-info p-2">Waiting List</h3>
      <Row>
        {
          waiting_details.map(detail => (
          <Col className='mb-2' key={detail.detail_id}   md='6' lg='4' >
            <WaitingDetail
              detail_clicked={() => props.update_detail(detail.detail_id, true)}
              detail={detail} />
          </Col>
          ))
        }
      </Row>
    </React.Fragment>
  );
}

export default WaitingDetails;
