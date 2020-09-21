from flask_restful import Resource, inputs
from backend.disoltano.models.category import CategoryModel
from backend.disoltano.utility import create_request_parser, UserLevel
from flask_jwt_extended import jwt_required, get_jwt_claims
from backend.disoltano.error_messages import (
  get_forbidden_error,
  get_internal_server_error,
  get_not_found_error
)

_name_arg = {"name": "name", "type": str}
_id_arg = {"name": "id", "type": int}

class Category(Resource):

  @jwt_required
  def get(self):
    data = create_request_parser([_name_arg]).parse_args()
    category = CategoryModel.find_by_name(data['name'])
    if not category:
      return get_not_found_error('category')
    return { "category": category.details_json() }

  @jwt_required
  def post(self):
    user_level = get_jwt_claims()['user_level']
    if user_level == UserLevel.GUEST:
      return get_forbidden_error()
    data = create_request_parser([_name_arg]).parse_args()
    category = CategoryModel(data['name'])
    if CategoryModel.find_by_name(data['name']):
      return {"message": "category with same name exists try another name."}, 400
    try:
      category.save_to_db()
    except Exception as ex:
      return get_internal_server_error()
    return { "category": category.json() }, 201

  @jwt_required
  def delete(self):
    user_level = get_jwt_claims()['user_level']
    if user_level == UserLevel.GUEST:
      return get_forbidden_error()
    data = create_request_parser([_id_arg]).parse_args()
    category = CategoryModel.find_by_id(data['id'])
    if not category:
      return get_not_found_error('category')
    try:
      if category.category_used():
        return { "message": "category used in product can't be deleted." }, 405
      category.delete_from_db()
    except Exception as ex:
      return get_internal_server_error()
    return {"message": "category deleted successfully."}

  @jwt_required
  def put(self):
    user_level = get_jwt_claims()['user_level']
    if user_level == UserLevel.GUEST:
      return get_forbidden_error()
    data = create_request_parser([_name_arg, _id_arg]).parse_args()
    category = CategoryModel.find_by_id(data['id'])
    if category:
      category.name = data['name']
    else:
      category = CategoryModel(data['name'])
    category.save_to_db()
    return {'category': category.json()}, 201

class CategoryList(Resource):
  @jwt_required
  def get(self):
    details = create_request_parser(
    [{"name": "details", "type": inputs.boolean}]).parse_args().get('details')

    result = {"categories": []}
    if details:
      result['categories'] = [category.details_json()
      for category in CategoryModel.get_all()]
    else:
      result['categories'] = [category.json()
      for category in CategoryModel.get_all()]
    return result