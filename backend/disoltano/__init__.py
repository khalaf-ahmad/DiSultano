from flask import Flask
from backend.disoltano.config import Config
from backend.disoltano.extensions_init import db, bcrypt, cors, socketio
from backend.disoltano.jwt import jwt
from backend.disoltano.api import api
from backend.disoltano.models.product import ProductModel
from backend.disoltano.models.category import CategoryModel
from backend.disoltano.models.user import UserModel
from flask_socketio import send

# creates flask app
def create_app(config_class=Config):
  app = Flask(__name__)

  # getting app configuration from config variable
  app.config.from_object(config_class)

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

  @socketio.on('message')
  def handle_message(msg):
    send(msg, broadcast=True)

  # Add extensions to created app
  db.init_app(app)
  api.init_app(app)
  jwt.init_app(app)
  bcrypt.init_app(app)
  cors.init_app(app)
  socketio.init_app(app, cors_allowed_origins="*")

  return app