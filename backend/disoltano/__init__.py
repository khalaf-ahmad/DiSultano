from flask import Flask
from backend.disoltano.config import Config
from backend.disoltano.extensions_init import db, bcrypt, cors
from backend.disoltano.jwt import jwt
from backend.disoltano.api import api


# creates flask app
def create_app(config_class=Config):
    app = Flask(__name__)

    # create db before first request
    @app.before_first_request
    def create_db():
        db.create_all()
    # getting app configuration from config variable
    app.config.from_object(config_class)

    # Add extensions to created app
    db.init_app(app)
    api.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app)
    return app