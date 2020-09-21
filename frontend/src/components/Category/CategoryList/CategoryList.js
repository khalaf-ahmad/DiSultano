import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdClear } from 'react-icons/md';

const list_height_style = {
  maxHeight: "calc( 100vh - 210px)",
  overflow: "auto",
};

export default function CategoryList(props) {
  return (
    <ListGroup
      style={list_height_style}
      role="button"
      as="ul"
      className="text-capitalize rounded-0 text-lead  mb-2"
    >
      {props.categories.map((category) => (
        <ListGroup.Item
          as="li"
          action
          active={category.id === props.selected_category.id}
          className="d-flex justify-content-between"
          key={category.id}
          onClick={() => props.item_selected(category)}
          variant="warning"
        >
          <span>{category.name}</span>
          <MdClear
            role="button"
            className="text-bg"
            onClick={(event) => props.delete_clicked(event, category.id)}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
