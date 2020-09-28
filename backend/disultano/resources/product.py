from flask_restful import Resource, request
from disultano.utility import (
  create_request_parser,
  UserLevel,
  save_picture,
  delete_img
)
from disultano.error_messages import (
  get_forbidden_error,
  get_internal_server_error,
  get_not_found_error
)
from disultano.models.product import ProductModel
from disultano.models.user import UserModel
from flask_jwt_extended import jwt_required, get_jwt_claims
import os


_name_arg = {"name": "name", "type": str, "location": "form"}
_id_arg = {"name": "id", "type": int, "location": "form"}
_category_id_arg = {"name": "category_id", "type": int, "location": "form"}
_price_arg = {"name": "price", "type": float, "location": "form"}
_receivers_args = {"name": "receivers", "type": int,
"location": "form", "action": "append", "required": False}

class Product(Resource):

  @jwt_required
  def get(self):
    data = create_request_parser([_name_arg]).parse_args()
    product = ProductModel.find_by_name(data['name'])
    if not product:
      return get_not_found_error('product')
    return { "product": product.json() }

  @jwt_required
  def post(self):
    user_level = get_jwt_claims()['user_level']
    if user_level == UserLevel.GUEST:
      return get_forbidden_error()
    data = create_request_parser([_name_arg,
      _price_arg, _category_id_arg, _receivers_args]).parse_args()
    image = request.files.get("image", None)
    product = ProductModel(data['name'], data['price'], data['category_id'], "")
    product.add_receivers(data.get('receivers', None))
    try:
      product.set_image(image)
      product.save_to_db()
    except Exception as ex:
      return get_internal_server_error()
    return { "product": product.json() }, 201

  @jwt_required
  def put(self):
    user_level = get_jwt_claims()['user_level']
    if user_level == UserLevel.GUEST:
      return get_forbidden_error()
    data = create_request_parser([_name_arg, _price_arg,
      _category_id_arg, _id_arg, _receivers_args]).parse_args()
    product = ProductModel.find_by_id(data['id'])
    image = request.files.get("image", None)
    try:
      if product:
        product.update_product(data['name'], data['price'], data['category_id'],
        image, data.get('receivers', None))
      else:
        product = ProductModel(**data)
        product.set_image(image)
        product.add_receivers(data.get('receivers', None))
        product.save_to_db()
    except Exception as ex:
      return get_internal_server_error()
    return { "product": product.json() }, 201

  @jwt_required
  def delete(self):
    user_level = get_jwt_claims()['user_level']
    if user_level == UserLevel.GUEST:
      return get_forbidden_error()
    data = create_request_parser([{**_id_arg, "location": "json"}]).parse_args()
    product = ProductModel.find_by_id(data['id'])
    if not product:
      return get_not_found_error('product')
    try:
      product.delete_from_db()
    except Exception as ex:
      return get_internal_server_error()
    return { "message": "product deleted successfully" }


class ProductList(Resource):

  @jwt_required
  def get(self):
    return {"products": [product.json() for product in ProductModel.get_all()]}
