from flask_restful import Resource, inputs, request
from backend.disoltano.utility import create_request_parser, UserLevel
from backend.disoltano.models.order import OrderModel, OrderDetailModel
from backend.disoltano.models.product import ProductModel
from flask_jwt_extended import jwt_required, get_jwt_claims, get_jwt_identity
from backend.disoltano.extensions_init import db

_customer_name = {"name": "customer_name", "type": str}
_id_arg = {"name": "id", "type": int, 'location': 'json'}
_description_arg = {"name": "description", "type": str}
_order_details = {'name': 'details', "type": list, "location":'json'}

_detail_id = {"name": "detail_id", "type": int, "location": 'json'}
_created = {'name': 'created', 'type': inputs.boolean, 'location': 'json'}

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
            detail['detail_price'], detail['quantity'], detail['description'],
            get_jwt_identity())
            db.session.add(order_detail)
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
        details = []
        for detail in order_details:
            order_detail = OrderDetailModel.find_by_id(detail['detail_id'])
            if order_detail:
                    order_detail.detail_price = detail['detail_price']
                    order_detail.quantity = detail['quantity']
                    order_detail.description = detail['description']
                    order_detail.created = detail['created']
                    if db.session.is_modified(order_detail):
                        order_detail.user_id = get_jwt_identity()
            else:
                order_detail = OrderDetailModel(detail['product_id'],
                detail['detail_price'], detail['quantity'],
                detail['description'], get_jwt_identity())
                db.session.add(order_detail)
            details.append(order_detail)
        order.details = []
        order.details.extend(details)
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
        result = {'orders': []}
        orders_pages = OrderModel.query.order_by(
            OrderModel.date_created.desc()).paginate(page=page, per_page=10)
        result['orders'] = [order.json() for order in orders_pages.items]
        result['has_next'] = orders_pages.has_next
        result['has_prev'] = orders_pages.has_prev
        result['total_orders'] = orders_pages.total
        result['page'] = orders_pages.page
        result['pages'] = orders_pages.pages
        return result


class OrderDetail(Resource):

    @jwt_required
    def get(self):
        user_level = get_jwt_claims()['user_level']
        page = request.args.get('page', 1, type=int)
        if user_level == UserLevel.ADMIN or user_level == UserLevel.SYS_ADMIN:
            try:
                return {
                    'created': OrderDetailModel.admin_created_details(page, 10),
                    'waiting': OrderDetailModel.admin_waiting_details()
                }
            except Exception as e:
                return {
                    "message": "internal server error"
                }, 500
        user_id = get_jwt_identity()
        try:
            return {
                'created': OrderDetailModel.user_created_details(user_id,
                    page, 10),
                'waiting': OrderDetailModel.user_waiting_details(user_id)
            }
        except Exception as e:
            return {'message': "internal server error!"}, 500

    @jwt_required
    def put(self):
        data = create_request_parser([_detail_id, _created]).parse_args()
        detail = OrderDetailModel.find_by_id(data['detail_id'])
        if not detail:
            return {'message': 'detail not found!'}, 404
        detail.created = data['created']
        detail.user_id = get_jwt_identity()
        detail.save_to_db()
        return {'message': 'Update Success.'}