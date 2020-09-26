from flask_restful import Resource, inputs, request
from disoltano.utility import create_request_parser, UserLevel
from disoltano.models.order import OrderModel
from disoltano.models.order_detail import OrderDetailModel
from disoltano.models.product import ProductModel
from flask_jwt_extended import jwt_required, get_jwt_claims, get_jwt_identity
from disoltano.extensions_init import db
from disoltano.error_messages import (
  get_forbidden_error,
  get_internal_server_error,
  get_not_found_error
)

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
      return get_not_found_error('order')
    return {'order': order.json()}

  @jwt_required
  def post(self):
    data = create_request_parser([_customer_name, _description_arg,
    _order_details]).parse_args()
    order_details = data['details']
    del data['details']
    user_id = get_jwt_identity()
    order = OrderModel(**data)
    order.add_details(order_details, user_id)
    order.user_id = user_id
    try:
      order.save_to_db()
    except Exception as e:
      return get_internal_server_error()
    return { 'order': order.json() }, 201

  @jwt_required
  def put(self):
    data = create_request_parser([_customer_name, _description_arg,
    _order_details, _id_arg]).parse_args()
    order = OrderModel.find_by_id(data['id'])
    order_details = data['details']
    del data['details']
    order_id = data['id']
    user_id = get_jwt_identity()
    del data['id']
    if order:
      order.update_order(data['customer_name'], data['description'],
      order_details, user_id)
    else:
      order = OrderModel(**data)
      order.add_details(order_details, user_id)
      order.user_id = user_id
      order.save_to_db()
    return {'order': order.json()}

  @jwt_required
  def delete(self):
    data = create_request_parser([_id_arg]).parse_args()
    order = OrderModel.find_by_id(data['id'])
    if not order:
      return get_not_found_error('order')
    try:
      order.delete_from_db()
    except Exception as e:
      return get_internal_server_error()
    return {'message': 'order deleted successfully'}

class OrderList(Resource):

  @jwt_required
  def get(self):
    page = request.args.get('page', 1, type=int)
    user_level = get_jwt_claims()['user_level']
    result = {'orders': []}
    query = OrderModel.query
    if user_level != UserLevel.ADMIN and user_level != UserLevel.SYS_ADMIN:
      user_id = get_jwt_identity()
      query = query.filter_by(user_id=user_id)
    orders_pages = query.order_by(
      OrderModel.date_created.desc()).paginate(page=page, per_page=12)
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
    try:
      if user_level == UserLevel.ADMIN or user_level == UserLevel.SYS_ADMIN:
        return {
          'created': OrderDetailModel.admin_created_details(page, 10),
          'waiting': OrderDetailModel.admin_waiting_details()
        }
      user_id = get_jwt_identity()
      return {
        'created': OrderDetailModel.user_created_details(user_id, page, 10),
        'waiting': OrderDetailModel.user_waiting_details(user_id)
      }
    except Exception as e:
      return get_internal_server_error()

  @jwt_required
  def put(self):
    data = create_request_parser([_detail_id, _created]).parse_args()
    detail = OrderDetailModel.find_by_id(data['detail_id'])
    if not detail:
      return get_not_found_error('detail')
    detail.created = data['created']
    detail.user_id = get_jwt_identity()
    detail.save_to_db()
    return {'message': 'Update Success.'}