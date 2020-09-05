from flask_restful import Resource, inputs, request
from backend.disoltano.utility import create_request_parser
from backend.disoltano.models.order import OrderModel, OrderDetailModel
from backend.disoltano.models.product import ProductModel
from flask_jwt_extended import jwt_required, get_jwt_claims

_customer_name = {"name": "customer_name", "type": str}
_id_arg = {"name": "id", "type": int, 'location': 'json'}
_description_arg = {"name": "description", "type": str}
_order_details = {'name': 'details', "type": list, "location":'json'}

class Order(Resource):

    @jwt_required
    def get(self):
        data = create_request_parser([_id_arg]).parse_args()
        order = OrderModel.find_by_id(data['id'])
        if not order:
            return {
                'message': 'order not found!'
            }, 404
        return {'order': order.json()}

    @jwt_required
    def post(self):
        data = create_request_parser([_customer_name, _description_arg,
            _order_details]).parse_args()
        order_details = data['details']
        del data['details']
        order = OrderModel(**data)
        for detail in order_details:
            order_detail = OrderDetailModel(detail['product_id'],
            detail['detail_price'], detail['quantity'], detail['description'])
            order.details.append(order_detail)
        try:
            order.save_to_db()
        except Exception as e:
            return {'message': 'internal server error!'+str(e)}, 500
        return {
            'order': order.json()
        }, 201

    @jwt_required
    def put(self):
        data = create_request_parser([_customer_name, _description_arg,
            _order_details, _id_arg]).parse_args()
        order = OrderModel.find_by_id(data['id'])
        order_details = data['details']
        del data['details']
        order_id =  data['id']
        del data['id']
        new_order = OrderModel(**data)
        if order:
            order.customer_name = new_order.customer_name
            order.description = new_order.description
        else:
            order = OrderModel(**data)
        for detail in order_details:
                order_detail = OrderDetailModel.find_by_id(detail['detail_id'])
                if order_detail:
                    order_detail.detail_price = detail['detail_price']
                    order_detail.quantity = detail['quantity']
                    order_detail.description = detail['description']
                    order_detail.save_to_db()
                else:
                    order_detail = OrderDetailModel(data['product_id'],
                    data['detail_price'], data['quantity'], data['description'])
                    order.append(order_detail)
        order.save_to_db()
        return {'order': order.json()}

    @jwt_required
    def delete(self):
        data = create_request_parser([_id_arg]).parse_args()
        order = OrderModel.find_by_id(data['id'])
        if not order:
            return {'message': 'order not found!'}, 404
        try:
            order.delete_from_db()
        except Exception as e:
            return {'message': 'internal server error.'+str(e)}, 500
        return {'message': 'order deleted successfully'}

class OrderList(Resource):

    @jwt_required
    def get(self):
        page = request.args.get('page', 1, type=int)
        print(page)
        result = {'orders': []}
        orders_pages = OrderModel.query.paginate(page=page, per_page=10)
        result['orders'] = [order.json() for order in orders_pages.items]
        result['has_next'] = orders_pages.has_next
        result['has_prev'] = orders_pages.has_prev
        result['total_orders'] = orders_pages.total
        result['page'] = orders_pages.page
        result['pages'] = orders_pages.pages
        return result
 