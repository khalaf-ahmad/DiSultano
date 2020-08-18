from flask_restful import reqparse
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token
)

def create_request_parser(options):
    _parser = reqparse.RequestParser()
    for option in options:
        _parser.add_argument(
                option.get('name', None),
                type=option.get('type', str),
                required=True,
                help="This field cannot be blank"
            )

    return _parser

class UserLevel():
    GUEST = 1
    ADMIN = 2
    SYS_ADMIN = 3

def create_user_token(userId):
    access_token = create_access_token(identity=userId, fresh=True)
    refresh_token = create_refresh_token(userId)
    return {
        'access_token': access_token,
        'refresh_token': refresh_token
    }
