import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {MdClear} from 'react-icons/md';

const Categories = ({category_list, delete_clicked}) => {
    return (
        <ListGroup className="text-capitalize rounded-0 text-lead">
            {category_list.map((category) => (
            <ListGroup.Item className="d-flex justify-content-between" key={category.id} variant="warning">
                    <span>{category.name}</span>
                    <MdClear role="button" className="text-bg" color="red"
                        onClick={() => delete_clicked(category.id)} />
            </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default Categories;
