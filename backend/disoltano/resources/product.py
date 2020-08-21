from flask_restful import Resource
from backend.disoltano.utility import create_request_parser, UserLevel
from backend.disoltano.models.product import ProductModel
from flask_jwt_extended import (
    jwt_required,
    get_jwt_claims
)

_name_arg = {"name": "name", "type": str}
_id_arg = {"name": "id", "type": int}
_category_id_arg = {"name": "category_id", "type": int}
_price_arg = {"name": "price", "type": float}


class Product(Resource):

    @jwt_required
    def get(self):
        data = create_request_parser([_name_arg]).parse_args()
        product = ProductModel.find_by_name(data['name'])
        if not product:
            return {'message': 'product not found!'}, 404
        return {
            "product": product.json()
        }

    @jwt_required
    def post(self):
        user_level = get_jwt_claims()['user_level']
        if user_level == UserLevel.GUEST:
            return {
                "message": "you don't have access rights to the content.",
                "error": "request_forbidden"
            }, 403
        data = create_request_parser([_name_arg, _price_arg, _category_id_arg]).parse_args()
        product = ProductModel(**data)
        try:
            product.save_to_db()
        except Exception as ex:
            return {"message": "internal server error!"}, 500
        
        return {
            "product": product.json()
        }, 201


    @jwt_required
    def delete(self):
        user_level = get_jwt_claims()['user_level']
        if user_level == UserLevel.GUEST:
            return {
                "message": "you don't have access rights to the content.",
                "error": "request_forbidden"
            }, 403
        data = create_request_parser([_id_arg]).parse_args()
        product = ProductModel.find_by_id(data['id'])
        if not product:
            return {
                "message": "product not found."
            }, 404
        try:
            product.delete_from_db()
        except Exception as ex:
            return {"message": "internal server error!"}, 500
        
        return {
            "message": "product deleted successfully"
        }

    @jwt_required
    def put(self):
        user_level = get_jwt_claims()['user_level']
        if user_level == UserLevel.GUEST:
            return {
                "message": "you don't have access rights to the content.",
                "error": "request_forbidden"
            }, 403
        data = create_request_parser([_name_arg, _price_arg, _category_id_arg, _id_arg]).parse_args()
        product = ProductModel.find_by_id(data['id'])
        try:
            if product:
                product.name = data['name']
                product.price = data['price']
                product.category_id = data['category_id']
            else:
                product = ProductModel(**data)
            product.save_to_db()
        except Exception as ex:
            return {"message": "internal server error!"}, 500
        
        return {
            "product": product.json()
        }, 201



class ProductList(Resource):

    @jwt_required
    def get(self):
        return {
            "products": [product.json() for product in ProductModel.get_all()]
        }
