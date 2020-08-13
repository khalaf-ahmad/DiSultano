from flask import Flask
from disoltano.config import Config
from disoltano.db import db
from flask_jwt_extended import JWTManager
from flask_restful import Api

# create api variable to make restful api's and endpoints
api = Api()

#create jwt variable to add authentication and authorization to our app
jwt = JWTManager()

# creates flask app
def create_app(config_class=Config):
    app = Flask(__name__)
    # getting app configuration from config variable
    app.config.from_object(config_class)
    
    # Add extensions to created app
    db.init_app(app)
    api.init_app(app)
    jwt.init_app(app)
    
    return app