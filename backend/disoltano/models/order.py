from backend.disoltano.extensions_init import db
from datetime import datetime
from backend.disoltano.models.Model import BaseModel


class OrderDetailModel(db.Model, BaseModel):
    __tablename__ = "order_detail"

    detail_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.ForeignKey('product.id'), nullable=False)
    order_id = db.Column(db.ForeignKey('customer_order.id'), nullable=False)
    detail_price = db.Column(db.Float(precision=2), nullable=False, default=0)
    created = db.Column(db.Boolean, nullable=False, default=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    description = db.Column(db.Text, default="")
    product = db.relationship('ProductModel', lazy='subquery', uselist=False,
        backref=db.backref('product_orders', lazy=True))
    order = db.relationship("OrderModel", lazy='subquery', uselist=False,
        backref=db.backref('details', lazy='subquery', cascade='delete-orphan')
    )

    def __init__(self, product_id, detail_price, quantity,
        description, created=False):
        self.product_id = product_id
        self.order_id
        self.detail_price = detail_price
        self.quantity = quantity
        self.description = description
        self.created = created

    def json(self):
        return {
            'detail_id': self.detail_id,
            'order_id': self.order_id,
            'detail_price': self.detail_price,
            'created': self.created,
            'quantity': self.quantity,
            'description': self.description,
            'product_id': self.product_id,
            'product': {'name': self.product.name} if self.product else None
        }

class OrderModel(db.Model, BaseModel):
    __tablename__ ="customer_order"

    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, nullable=False,
        default=datetime.now)
    customer_name = db.Column(db.String, nullable=False, default="")
    description = db.Column(db.Text, default="")

    def __init__(self, customer_name, description, date_created=None):
        self.customer_name = customer_name
        self.description = description
        if not date_created:
            self.date_created = datetime.now()

    def delete_from_db(self):
        for detail in self.details:
            detail.delete_from_db()
        db.session.delete(self)
        db.session.commit()

    def json(self):
        details = []
        total_price = 0
        for detail in self.details:
            details.append(detail.json())
            total_price += detail.detail_price*detail.quantity
        return {
            'id': self.id,
            'customer_name': self.customer_name,
            'date_created': self.date_created.strftime('%B %d, %Y, %H:%M'),
            'description': self.description,
            'details': details,
            'total_price': total_price
        }
