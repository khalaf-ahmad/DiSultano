import React, {useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {MdClear} from 'react-icons/md';
import CategoryForm from './CategoryForm/CategoryForm';

const initial_category = { id: 0, name: "" };
const style = {
  maxHeight: "calc( 100vh - 210px)",
  overflow: "auto",
};
const Categories = ({ category_list, delete_clicked }) => {
    const [selected_category, setCategory] = useState({...initial_category});
    const on_select_category = (category) => setCategory({ ...category });
    const reset_category = () => setCategory({ ...initial_category });
    const handle_submit = () => {}
    const handle_name_change = (event) => {
      const name = event.target.value;
      setCategory((prevState) => {
        return {
          ...prevState,
          name
        }
      })
    };
    return (
        <React.Fragment>
          <ListGroup style={style} as="ul" className="text-capitalize rounded-0 text-lead">
              {category_list.map((category) => (
                <ListGroup.Item
                  as="li"
                  action
                  active={category.id === selected_category.id}
                  className="d-flex justify-content-between"
                  key={category.id}
                  onClick={() => on_select_category(category)}
                  variant="warning">
                  <span>{category.name}</span>
                      <MdClear role="button" className="text-bg" 
                          onClick={() => delete_clicked(category.id)} />
              </ListGroup.Item>
              ))}
          </ListGroup>
          <CategoryForm
            clear_clicked={() => reset_category()}
            submit_clicked={handle_submit}
            name_changed={(event) => handle_name_change(event)}
            category={selected_category} />
        </React.Fragment>
    );
}

export default Categories;
