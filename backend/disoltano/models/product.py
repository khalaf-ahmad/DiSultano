from backend.disoltano.models.Model import Model
from backend.disoltano.extensions_init import db

class ProductModel(Model, db.Model):
    __tablename__ = "product"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    price = db.Column(db.Float(precision=2))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    
    def __init__(self, name, price, category_id):
        self.name = name
        self.price = price
        self.category_id = category_id

    def json(self):
        return {
            "name": self.name,
            "price": self.price,
            "id": self.id,
            "category": self.category.json(),
        }