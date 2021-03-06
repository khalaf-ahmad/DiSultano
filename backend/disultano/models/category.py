from disultano.models.Model import BaseModel
from disultano.extensions_init import db
from disultano.models.product import ProductModel

class CategoryModel(BaseModel, db.Model):
  __tablename__ = "category"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(40), nullable=False, unique=True)
  products = db.relationship('ProductModel', backref="category", lazy=True)

  def __init__(self, name):
    self.name = name

  def details_json(self):
    return {
      "name": self.name,
      "id": self.id,
      "products": [{
        "name": product.name,
        "id": product.id,
        "price": product.price,
        "image": product.get_image_url()
      } for product in self.products]
    }

  def json(self):
    return {
      "name": self.name,
      "id": self.id
    }

  def category_used(self):
    exists = ProductModel.query.filter_by(category_id=self.id).first()
    return exists
