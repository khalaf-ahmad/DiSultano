from flask_restful import Resource, inputs, request
from disultano.utility import create_request_parser, UserLevel
from disultano.models.order import OrderModel
from disultano.models.order_detail import OrderDetailModel
from disultano.models.product import ProductModel
from flask_jwt_extended import jwt_required, get_jwt_claims, get_jwt_identity
from disultano.extensions_init import db
from disultano.error_messages import (
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

class PrintOrder(Resource):
  @jwt_required
  def post(self):
    data = create_request_parser([_id_arg]).parse_args()
    order = OrderModel.find_by_id(data['id'])
    if not order:
      return get_not_found_error('order')
    try:
      from escpos import printer
      from datetime import datetime

      p = printer.Usb(0x0483, 0x5743, 0, 0x81, 0x03)
      # header
      p.set(align="center", text_type="B", width=2)
      p.text("Di Sultano Shop\n\n")
      p.set(align="center")
      p.text("Borj.Tyr\n")
      p.text("Tel : 71516540\n")
      p.text(datetime.utcnow().strftime('%d/%b/%Y  %H:%M') + "\n")
      p.set(align="left", text_type="B")
      p.text(f"{'Take away':<9s}{order.customer_name:>39s}")
      p.text("\n")
      # table
      p.set(align="left")
      dash = '-' * 48
      p.text(dash)
      p.text('{:<25s}{:>3s}{:>10s}{:>10s}'.format("Item", "Qty", "Price", "Tot"))
      p.text(dash)
      total_price = 0
      for detail in order.details:
          itemName = detail.product.name
          name  = "sdf"
          if len(itemName) > 25:
            itemName = '{:.<25}'.format(itemName[: 22])
          quantity = detail.quantity
          price = "{:,.0f}".format(detail.detail_price)
          tot =  "{:,.0f}".format(detail.quantity * detail.detail_price)
          total_price += detail.quantity * detail.detail_price
          p.text('{:<25s}{:>3d}{:>10s}{:>10s}'.format(itemName, quantity, price, tot))

      p.text("\n")
      p.text("-"*48)
      p.text("\n")

      #  footer
      p.set(align="right", text_type="B")
      p.text("Total Invoice :  {:,} L.L\n".format(total_price))
      p.set(text_type="A")
      p.text('\n')
      p.set(align="left")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
      p.text("Served by : Darine Mustafa.\n")
      p.text("Thank you for choosing disultano.\n\n")
      p.set(width=2, align="center")
      p.text("Challenge Test.\n\n")
      p.set(text_type="A")
      p.set(align="right")
      p.text("Owner: Jalal hicham.\n")
      p.cut()
    except Exception as e:
      return get_internal_server_error()

    return {'message': "order printed"}
