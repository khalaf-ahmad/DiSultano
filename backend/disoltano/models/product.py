from backend.disoltano.models.Model import BaseModel
from backend.disoltano.extensions_init import db
from backend.disoltano.models.user import UserModel
from backend.disoltano.utility import save_picture, delete_img
from flask import url_for, current_app
import os

product_reciever = db.Table('product_receivers',
  db.Column('product_id', db.Integer, db.ForeignKey('product.id'),
    primary_key=True),
  db.Column('receiver_id', db.Integer, db.ForeignKey('user.id'),
    primary_key=True)
)

_images_folder = 'product_imgs'

class ProductModel(BaseModel, db.Model):
  __tablename__ = "product"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False)
  price = db.Column(db.Float(precision=2))
  category_id = db.Column(db.Integer, db.ForeignKey('category.id'),
    nullable=False)
  image_file =db.Column(db.String)
  receivers = db.relationship("UserModel", secondary=product_reciever,
    lazy='subquery', backref=db.backref('products', lazy=True))

  def __init__(self, name, price, category_id, image_file):
    self.name = name
    self.price = price
    self.category_id = category_id
    self.image_file = image_file

  def json(self):
    return {
      "name": self.name,
      "price": self.price,
      "id": self.id,
      "category": self.category.json() \
        if self.category_id != 0 else {"id": 0, "name": ""},
      "receivers": [user.json() for user in self.receivers ],
      "image": self.get_image_url()
    }

  def get_image_url(self):
    img_path = os.path.join(current_app.root_path,
    "static", _images_folder, self.image_file)
    if not self.image_file or not os.path.exists(img_path):
      return ""
    return url_for('static', filename=_images_folder+'/' + self.image_file)

  def add_receivers(self, receivers):
    if receivers:
      for user_id in receivers:
        user = UserModel.find_by_id(user_id)
        self.receivers.append(user) if user else None

  def set_receivers(self, receivers):
    self.receivers.clear()
    self.add_receivers(receivers)

  def set_image(self, image):
    if image:
      file_name = save_picture(image, _images_folder)
      self.image_file = file_name

  def update_product(self, name, price, category_id, image, receivers):
    self.name = name
    self.price = price
    self.category_id = category_id
    if image:
      delete_img(self.image_file, _images_folder)
      self.set_image(image)
    self.set_receivers(receivers)
    self.save_to_db()

  def delete_from_db(self):
    delete_img(self.image_file, _images_folder)
    super().delete_from_db()