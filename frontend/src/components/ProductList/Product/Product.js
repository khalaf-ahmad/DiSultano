import React, {useRef, useEffect} from 'react';
import { Col, Card, Accordion, ListGroup } from 'react-bootstrap';
import classes from './Product.module.css';
import axios from "../../../axios-base";

const Product = ({ product, card_clicked, category }) => {

  const img_ref = useRef();
  useEffect(() => {
    if (product.image) {
      axios.get(product.image, { responseType: "blob" })
        .then((response) => {
          const reader = new window.FileReader();
          reader.readAsDataURL(response.data);
          reader.onload = () => {
            const img_url = reader.result;
            img_ref.current.setAttribute("src", img_url);
          };
      });
    }
  }
  , [product.image]);

  return (
    <Col xs="6" sm="4" lg="3" onClick={card_clicked}>
      <Card>
        {product.image ? (
          <Card.Img
            className="bg-warning"
            variant="top"
            height="150px"
            ref={img_ref}
          />
        ) : null}
        <Card.Body className="bg-warning">
          <Card.Title className="text-primary text-capitalize">
            {product.name}
          </Card.Title>
          <Card.Subtitle className="text-secondary text-capitalize">
            {category? category.name : ""}
          </Card.Subtitle>
          <Card.Text className="text-success d-flex justify-content-end">
            {(+product.price.toFixed(2)).toLocaleString()}
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
              onClick={(event) => event.stopPropagation()}
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
