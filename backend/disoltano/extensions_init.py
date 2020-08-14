from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# to make cross-origin ajax possible
cors = CORS()
#create jwt variable to add authentication and authorization to our app
jwt = JWTManager()

# create bcrypt variable to encrypt and decrypt passwords
bcrypt = Bcrypt()

db = SQLAlchemy()