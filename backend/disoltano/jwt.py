from flask_jwt_extended import JWTManager
from backend.disoltano.utility import UserLevel
from backend.disoltano.models.user import UserModel
from flask import jsonify

#create jwt variable to add authentication and authorization to our app
jwt = JWTManager()

"""
`claims` are data we choose to attach to each jwt payload
and for each jwt protected endpoint, we can retrieve these claims via
`get_jwt_claims()`
"""

@jwt.user_claims_loader
def add_claims_to_jwt(identity):  # identity that pass when create access token
  user = UserModel.find_by_id(identity)
  return {"user_level": user.role}

@jwt.invalid_token_loader
def invalid_token_callback(error):
  return jsonify({
    'message': 'Signature verification failed.',
    'error': 'invalid_token'
  }), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
  return jsonify({
    'message': 'Request does not contain an access token.',
    'error': 'authorization_required'
  }), 401

@jwt.needs_fresh_token_loader
def token_not_fresh_callback():
  return jsonify({
    "message": 'The token is not fresh',
    'error': 'fresh_token_required'
  }), 401

@jwt.revoked_token_loader
def revoked_token_callback():
  return jsonify({
    'message': "The token has been revoked.",
    'error': 'token_revoked'
  }), 401