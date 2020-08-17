from flask_restful import Resource, reqparse, request
from backend.disoltano.models.user import UserModel
from backend.disoltano.extensions_init import bcrypt
from flask_jwt_extended import (
    jwt_required,
    get_jwt_claims,
    create_access_token,
    get_jwt_identity,
    jwt_refresh_token_required
)
from backend.disoltano.utility import create_request_parser, UserLevel, create_user_token

auth_list = ["username", "password"]

class Registration(Resource):

    def post(self):
        data = create_request_parser([*auth_list, "name"]).parse_args()
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

        return {
            "message": "Registration Success!",
            "token": create_user_token(user.id)
        }, 201


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
    @jwt_required
    def get(self):
        user_level = get_jwt_claims()['user_level']
        if user_level == UserLevel.GUEST:
            return {
                "message": "you don't have access rights to the content.",
                "error": "request_forbidden"
            }, 403
        users = []
        if user_level == UserLevel.SYS_ADMIN:
            users = [user.json() for user in UserModel.get_all()]
        elif user_level == UserLevel.ADMIN:
            users = [user.json() for user in UserModel.get_guest_users()]

        return {"users": users}

class UserLogin(Resource):

    def post(self):
        data = create_request_parser(auth_list).parse_args();
        user = UserModel.find_by_username(data['username'])
        if not user or not bcrypt.check_password_hash(user.password, data['password']):
            return {"message": "invalid username or passwrod."}, 401
        return {
            "message": "Login Success.",
            "token": create_user_token(user.id)
        }


class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        """
        Get a new access token without requiring username and password—only the 'refresh token'
        provided in the /login endpoint.

        Note that refreshed access tokens have a `fresh=False`, which means that the user may have not
        given us their username and password for potentially a long time (if the token has been
        refreshed many times over).
        """
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {'access_token': new_token}, 201
