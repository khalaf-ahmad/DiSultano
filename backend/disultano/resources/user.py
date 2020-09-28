from flask_restful import Resource, request
from disultano.models.user import UserModel
from disultano.extensions_init import bcrypt
from flask_jwt_extended import (
  jwt_required,
  get_jwt_claims,
  create_access_token,
  get_jwt_identity,
  jwt_refresh_token_required
)
from disultano.utility import (
  create_request_parser,
  UserLevel,
  create_user_token
)
from disultano.error_messages import (
  get_forbidden_error,
  get_internal_server_error,
  get_not_found_error
)

_username_arg = {"name": "username", "type": str}
_password_arg = {"name": "password", "type": str}
_name_arg = {"name": "name", "type": str}
_id_arg = {"name": "id", "type": int}
_role_arg = {"name": 'role', "type": int}
_status_arg = {"name": 'activated', "type": bool}

auth_list = [_username_arg, _password_arg]
_user_list = [*auth_list, _name_arg, _id_arg, _role_arg, _status_arg]
class Registration(Resource):

  def post(self):
    data = create_request_parser([*auth_list, _name_arg]).parse_args()
    password_required_lenght = 5
    if len(data['password']) < password_required_lenght:
      return {"message": f"password must have at least\
      {password_required_lenght} characters"}, 400
    if UserModel.find_by_username(data['username']):
      return {"message": "username already exists"}, 400
    user = UserModel(**data)
    user.password = bcrypt.generate_password_hash(user.password).decode('utf-8')
    try:
      user.save_to_db()
    except Exception as e:
      return get_internal_server_error()
    return {
      "message":
    "Registration success you must contact admin to activate your account."
    }, 405

  @jwt_required
  def put(self):
    user_data = request.get_json()
    user = UserModel.find_by_id(user_data.get('id', None))
    if not user:
      return get_not_found_error('user')
    user_level = get_jwt_claims()["user_level"]
    current_user_id = get_jwt_identity()
    # user want to update other user info
    if current_user_id != user.id:
      # the user is guest and he is not allowed to do this action
      if user_level != UserLevel.ADMIN and user_level != UserLevel.SYS_ADMIN:
        return {'message': 'you are not allowed to do this action.'}, 405
      # admin or sys admin want to activate user
      user_data = create_request_parser([_role_arg,
      _status_arg]).parse_args()
      user.role = user_data['role']
      user.activated = user_data['activated']
      user.save_to_db()
      return {'message': 'change success.', 'user': user.json()}, 201
    # update profile info
    if "name" in user_data:
      user.name = user_data.get("name")
    if "password" in user_data:
      user.password = bcrypt.generate_password_hash(
      user_data['password']).decode('utf-8')
    user.save_to_db()
    return {'message': 'change success.', 'user': user.json()}, 201

  @jwt_required
  def delete(self):
    user_level = get_jwt_claims()["user_level"]
    if user_level != UserLevel.ADMIN and user_level != UserLevel.SYS_ADMIN:
      return {'message':'you are not allowed to do this action.'}, 405
    data = request.get_json()
    user = UserModel.find_by_id(data['id'])
    if user:
      try:
        user.delete_from_db()
        return {"message": "user deleted"}
      except Exception as e:
        return get_internal_server_error()
    return get_not_found_error('user')

class Users(Resource):
  @jwt_required
  def get(self):
    user_level = get_jwt_claims()['user_level']
    current_user_id = get_jwt_identity()
    if user_level == UserLevel.GUEST:
      return get_forbidden_error()
    users = []
    if user_level == UserLevel.SYS_ADMIN:
      users = [user.json() for user in UserModel.get_all()
      if user.id != current_user_id]
    elif user_level == UserLevel.ADMIN:
      users = [user.json() for user in UserModel.get_guest_users()
      if user.id != current_user_id]

    return {"users": users}

class UserLogin(Resource):

  def post(self):
    data = create_request_parser(auth_list).parse_args();
    user = UserModel.find_by_username(data['username'])
    if not user or not bcrypt.check_password_hash(user.password,
    data['password']):
      return {"message": "invalid username or passwrod."}, 401
    if not user.activated:
      return {'message': 'not allowed to login please contact admin.'}, 405
    return {
      "message": "Login Success.",
      "token": create_user_token(user.id),
      "user": user.json()
    }


class TokenRefresh(Resource):
  @jwt_refresh_token_required
  def post(self):
    """
    Get a new access token without requiring username and password—only the
    'refresh token'
    provided in the /login endpoint.

    Note that refreshed access tokens have a `fresh=False`,
    which means that the user may have not
    given us their username and password for potentially a long time 
    (if the token has been
    refreshed many times over).
    """
    current_user_id = get_jwt_identity()
    new_token = create_access_token(identity=current_user_id, fresh=False)
    user = UserModel.find_by_id(current_user_id)
    user_data = {}
    if user:
      user_data = user
    return {'access_token': new_token, "user": user_data.json() }, 201
