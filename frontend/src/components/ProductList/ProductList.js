import React, {useState} from 'react';
import Product from './Product/Product';
import ProductForm from "./ProductForm/ProductForm";
import { Row } from 'react-bootstrap';


const style = {
    maxHeight: "calc( 100vh - 395px)",
    overflow: "auto",
};

const initial_product = {
    name: "",
    category: { name: "", id: 0 },
    price: 0 ,
    receivers: [],
    image: {name: ""}
};

const get_initial_product = () => {
    return {
        ...initial_product,
        category: { ...initial_product.category },
        receivers: [...initial_product.receivers],
    };
};
const ProductList = (props) => {

    const [selected_product, set_selected_product] = useState(get_initial_product());


    const handle_change = (event) => {
        const value = event.target.value;
        const property = event.target.id;
        set_selected_product((prevState) => {
            return {
                ...prevState,
                [property]: value,
            };
        });
    };

    const handle_image_changed = (event) => {
        const new_image = event.target.files[0];
        set_selected_product((prevState) => {
            return {
                ...prevState,
                image: new_image
            };
        });
    }
    const handle_add_receiver = (user) => {
        const idx =  selected_product.receivers.findIndex(usr => usr.id === user.id)
        if (idx >= 0) {
            return;
        }
        set_selected_product(prevState => {
            return {
                ...prevState,
                receivers: [{ ...user }, ...prevState.receivers]
            };
        });
    };

    const handle_delete_user = (receiverId) => {
        const updated_receivers = selected_product.receivers.filter(
            reciever => reciever.id !== receiverId
        );
        set_selected_product(prevState => {
            return {
                ...prevState,
                receivers: updated_receivers
            };
        });
    };

    const handle_category_changed = (event) => {
        const category_id = +event.target.value;
        const category = props.category_list.find(ctr => ctr.id === category_id);
        if (!category) {
            return;
        }
        set_selected_product(prevState => {
            return {
                ...prevState,
                category: { ...category }
            };
        });
    };

    const handle_submit = () => {

    };

    const handle_clear = () => {
        set_selected_product(get_initial_product());
    }

    const on_product_selected = (product_selected) => {
        set_selected_product({ ...product_selected });
    }
    return (
        <React.Fragment>
            <Row style={style} >
                {props.products.map((product, idx) => <Product
                    card_clicked={()=> on_product_selected(product)}
                    key={idx}
                    product={product} />)}
            </Row>
            <Row>
                <ProductForm
                    product={selected_product}
                    category_list={props.category_list}
                    input_changed={(event) => handle_change(event)}
                    users={props.users}
                    delete_user_clicked={handle_delete_user}
                    add_user_clicked={handle_add_receiver}
                    image_changed={(event) =>handle_image_changed(event)}
                    category_changed={(event) => handle_category_changed(event)}
                    clear_clicked={handle_clear}
                    submit_clicked={handle_submit}
                />
            </Row>
        </React.Fragment>
        )
}

export default ProductList;
