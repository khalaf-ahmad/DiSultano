from flask_restful import Resource, reqparse, request
from backend.disoltano.models.user import UserModel
from backend.disoltano.extensions_init import bcrypt


_parser = reqparse.RequestParser()
_parser.add_argument(
        'username',
        type=str,
        required=True,
        help="This field cannot be blank"
    )
_parser.add_argument(
    'password',
    type=str,
    required=True,
    help="This field cannot be blank"
)
class Registration(Resource):

    def post(self):
        _parser.add_argument(
            'name',
            type=str,
            required=True,
            help="This field cannot be blank"
        )
        data = _parser.parse_args()
        password_required_lenght = 5
        if len(data['password']) < password_required_lenght:
            return {"message": f"password must have at least {password_required_lenght} characters"}, 400

        if UserModel.find_by_username(data['username']):
            return {"message": "username already exists"}, 400

        user = UserModel(**data)
        user.password = bcrypt.generate_password_hash(user.password).decode('utf-8')
        try:
            user.save_to_db()
        except Exception as e:
            return {"message": "internal server error"}, 500
        finally:
            _parser.remove_argument("name")

        return {"message": "Registration Success!"}, 201


    def delete(self):
        data = request.get_json()
        user = UserModel.find_by_username(data['username'])
        if user:
            try:
                user.delete_from_db()
                return {"message": "user deleted"}
            except Exception as e:
                return {"message": 'internal server error!'}, 500

        return {"message": "user not found!"}, 404

class Users(Resource):
    def get(self):
        return {
            "users": [
                user.json() for user in UserModel.get_all()
            ]
        }

class UserLogin(Resource):

    def post(self):
        data = _parser.parse_args();
        user = UserModel.find_by_username(data['username'])
        if not user or not bcrypt.check_password_hash(user.password, data['password']):
            return {"message": "invalid username or passwrod."}, 401
        return {"message": "Login Success."}