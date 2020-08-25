from backend.disoltano.models.Model import Model
from backend.disoltano.extensions_init import db
from flask import url_for, current_app
import os

class ProductModel(Model, db.Model):
    __tablename__ = "product"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    price = db.Column(db.Float(precision=2))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    image_file =db.Column(db.String)

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
            "category_id": self.category_id,
            "receivers": [],
            "image": self.get_image_url()
        }

    def details_json(self):
        return {
            "name": self.name,
            "price": self.price,
            "id": self.id,
            "category": self.category.json() if self.category \
                else {"id": 0},
            "receivers": [],
            "image": self.get_image_url()
        }

    def get_image_url(self):
        img_path = os.path.join(current_app.root_path,
        "static","product_imgs", self.image_file)
        if not self.image_file or not os.path.exists(img_path):
            return ""
        return url_for('static', filename='product_imgs/' + self.image_file)