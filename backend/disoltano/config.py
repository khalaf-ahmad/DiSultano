import os

class Config:
  SECRET_KEY = os.environ['SECRET_KEY']
  SQLALCHEMY_DATABASE_URI = os.environ['SQLALCHEMY_DATABASE_URI']
  PROPAGATE_EXCEPTIONS = True
  SQLALCHEMY_TRACK_MODIFICATIONS = False