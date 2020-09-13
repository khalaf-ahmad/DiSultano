import React, {useRef, useEffect} from 'react';
import { Col, Card } from 'react-bootstrap';
import axios from "../../../axios-base";

const Product = ({
  product,
  card_clicked,
  on_double_click,
  category,
  size,
}) => {
  const img_ref = useRef();
  useEffect(() => {
    if (product.image) {
      axios.get(product.image, { responseType: "blob" }).then((response) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = () => {
          const img_url = reader.result;
          img_ref.current.setAttribute("src", img_url);
        };
      });
    }
  }, [product.image]);

  return (
    <Col role="button" {...size} onClick={card_clicked}
      onDoubleClick={on_double_click}>
      <Card className='mb-2' >
        {product.image ? (
          <Card.Img
            className="bg-warning"
            variant="top"
            height="100px"
            ref={img_ref}
          />
        ) : null}
        <Card.Body className="bg-warning">
          <Card.Title style={{ fontSize: '.9rem' }}
            className="text-primary text-capitalize">
            {product.name}
          </Card.Title>
          {category ? (
            <Card.Subtitle style={{fontSize: '.8rem'}}
              className="text-secondary text-capitalize">
              {category.name}
            </Card.Subtitle>
          ) : null}
          <Card.Text className="text-success d-flex justify-content-end">
            {(+product.price.toFixed(2)).toLocaleString()}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;
