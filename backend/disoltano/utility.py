from flask_restful import reqparse

def create_request_parser(options):
    _parser = reqparse.RequestParser()

    _parser.add_argument(
            'username',
            type=str,
            required=True,
            help="This field cannot be blank"
        ) if options.count("username") else None

    _parser.add_argument(
        'password',
        type=str,
        required=True,
        help="This field cannot be blank"
    ) if options.count("password") else None

    _parser.add_argument(
            'name',
            type=str,
            required=True,
            help="This field cannot be blank"
        ) if options.count("name") else None
    return _parser

class UserLevel():
    GUEST = 1
    ADMIN = 2
    SYS_ADMIN = 3
