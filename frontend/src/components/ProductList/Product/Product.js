import React from 'react';
import { Col, Card, Accordion, ListGroup } from 'react-bootstrap';
import classes from './Product.module.css';
const Product = ({ product }) => {
  return (
    <Col sm="6" lg="3">
      <Card>
        {product.image ? (
          <Card.Img
            className="bg-warning"
            variant="top"
            height="150px"
            src={product.image}
          />
        ) : null}
        <Card.Body className="bg-warning">
          <Card.Title className="text-primary text-capitalize">
            {product.name}
          </Card.Title>
          <Card.Subtitle className="text-secondary text-capitalize">
            {product.category.name}
          </Card.Subtitle>
          <Card.Text className="text-success d-flex justify-content-end">
            {(+product.price).toFixed(2)}
          </Card.Text>
        </Card.Body>
        {product.receivers.length ? (
          <Accordion
            role="button"
            as={Card.Footer}
            className={classes.CardFooter}
          >
            <Accordion.Toggle
              className="text-warning p-2"
              as="div"
              eventKey="0"
            >
              Recievers
            </Accordion.Toggle>
            <Accordion.Collapse as="div" eventKey="0">
              <ListGroup className={classes.ListGroup}>
                {product.receivers.map((user) => (
                  <ListGroup.Item key={user.id} variant="warning">
                    {user.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Accordion.Collapse>
          </Accordion>
        ) : null}
      </Card>
    </Col>
  );
}

export default Product;
