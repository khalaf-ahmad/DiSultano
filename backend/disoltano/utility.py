from flask_restful import reqparse
from flask_jwt_extended import (
  create_access_token,
  create_refresh_token
)

import secrets
from PIL import Image
import os
from flask import current_app


def save_picture(form_picture):
  random_hex = secrets.token_hex(8)
  _, file_extensoin = os.path.splitext(form_picture.filename)
  new_name = random_hex + file_extensoin
  img_path = os.path.join(
  current_app.root_path, 'static/product_imgs', new_name)
  output_size = (100, 100)
  img = Image.open(form_picture)
  img.thumbnail(output_size)
  img.save(img_path)
  return new_name

def delete_product_img(img_name):
  if img_name:
    img_path = os.path.join(current_app.root_path,
    'static','product_imgs', img_name)
    if os.path.exists(img_path):
      os.remove(img_path)

def create_request_parser(options):
  _parser = reqparse.RequestParser()
  for option in options:
    req = option.get('required', None)
    _arg = {
      "required": True if  req is None else None,
      "help":"This field cannot be blank"
    }
    _arg.update(option)
    _parser.add_argument(**_arg)

  return _parser

class UserLevel():
  GUEST = 1
  ADMIN = 2
  SYS_ADMIN = 3

def create_user_token(userId):
  access_token = create_access_token(identity=userId, fresh=True)
  refresh_token = create_refresh_token(userId)
  return { 'access_token': access_token, 'refresh_token': refresh_token }
