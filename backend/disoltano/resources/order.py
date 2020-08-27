from flask_restful import Resource, inputs, request
from backend.disoltano.utility import create_request_parser
from backend.disoltano.models.order import OrderModel
from backend.disoltano.models.product import ProductModel
from flask_jwt_extended import jwt_required, get_jwt_claims

_customer_name = {"name": "customer_name", "type": str, "location": "form"}
_id_arg = {"name": "id", "type": int, 'location': 'form'}
_description_arg = {"name": "description", "type": str, "location": "form"}
_net_price = {'name': 'net_price', 'type': float, 'location': 'form'}
_order_details = {'name': 'details', "location": 'json'}
_details = {'name': 'with_details', 'type': inputs.boolean, 'location': 'args'}

class Order(Resource):

    @jwt_required
    def get(self):
        data = create_request_parser([_id_arg, _details]).parse_args()
        order = OrderModel.get_by_id(data['id'])
        if not order:
            return {
                'message': 'order not found!'
            }, 404
        if not data['with_details']:
            return {'order': order.json()}
        return {'order': order.details_json()}

    @jwt_required
    def post(self):
        data = create_request_parser([_customer_name, _description_arg,
            _net_price, _order_details]).parse_args()
        order = OrderModel(**data)
        try:
            order.save_to_db()
        except Exception:
            return {'message': 'internal server error!'}, 500
        return {
            'order': order.json()
        }, 201

    @jwt_required
    def put(self):
        data = create_request_parser([_customer_name, _description_arg,
            _net_price, _order_details, _id_arg]).parse_args()
        order = OrderModel.get_by_id(data['id'])
        new_order = OrderModel(**data)
        if order:
            order.customer_name = new_order.customer_name
            order.description = new_order.description
            order.net_price = new_order.net_price
            order.details = new_order.details
        else:
            order = OrderModel(**data)
        order.save_to_db()
        return {'order': order.json()}

    def delete(self):
        data = create_request_parser(_id_arg).parse_args()
        order = OrderModel.get_by_id(data['id'])
        if not order:
            return {'message': 'order not found!'}, 404
        try:
            order.delete_from_db()
        except Exception as e:
            return {'message': 'internal server error.'}, 500
        return {'message': 'order deleted successfully'}

class OrderList(Resource):

    @jwt_required
    def get(self):
        details = create_request_parser([_details]).parse_args()['with_details']
        result = {'orders': []}
        if details:
            result['orders'] = [order.details_json() \
                for order in OrderModel.get_all()]
        else:
            result['orders'] = [order.json() \
                for order in OrderModel.get_all()]
        return result
