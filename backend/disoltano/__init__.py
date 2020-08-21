from flask import Flask
from backend.disoltano.config import Config
from backend.disoltano.extensions_init import db, bcrypt, cors
from backend.disoltano.jwt import jwt
from backend.disoltano.api import api
from backend.disoltano.models.product import ProductModel
from backend.disoltano.models.category import CategoryModel
from backend.disoltano.models.user import UserModel
# creates flask app
def create_app(config_class=Config):
    app = Flask(__name__)

    # create db before first request
    @app.before_first_request
    def create_db():
        db.create_all()
        password = bcrypt.generate_password_hash("khalaf").decode('utf-8')
        user = UserModel("ahmad", "ahmad@", password, 3, True)

        db_user = UserModel.find_by_username(user.username)
        if db_user:
            db_user.name = user.name
            db_user.password = user.password
            db_user.activated = user.activated
            db_user.role = user.role
            db_user.save_to_db()
        else:
            user.save_to_db()

    # getting app configuration from config variable
    app.config.from_object(config_class)

    # Add extensions to created app
    db.init_app(app)
    api.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)
    return app