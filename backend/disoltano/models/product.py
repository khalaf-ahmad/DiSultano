from backend.disoltano.models.Model import BaseModel
from backend.disoltano.extensions_init import db
from flask import url_for, current_app
import os

product_reciever = db.Table('product_receivers',
  db.Column('product_id', db.Integer, db.ForeignKey('product.id'),
    primary_key=True),
  db.Column('receiver_id', db.Integer, db.ForeignKey('user.id'),
    primary_key=True)
)

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

  def __init__(self, name, price, category_id, image_file,):
    self.name = name
    self.price = price
    self.category_id = category_id
    self.image_file = image_file

  def json(self):
    return {
      "name": self.name,
      "price": self.price,
      "id": self.id,
      "category": {"id": self.category_id, "name": self.category.name} \
        if self.category_id != 0 else {"id": 0, "name": ""},
      "receivers": [user.json() for user in self.receivers ],
      "image": self.get_image_url()
    }

  def get_image_url(self):
    img_path = os.path.join(current_app.root_path,
    "static","product_imgs", self.image_file)
    if not self.image_file or not os.path.exists(img_path):
      return ""
    return url_for('static', filename='product_imgs/' + self.image_file)

