from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

#create jwt variable to add authentication and authorization to our app
jwt = JWTManager()

# create bcrypt variable to encrypt and decrypt passwords
bcrypt = Bcrypt()

db = SQLAlchemy()