from backend.disoltano.extensions_init import db
from datetime import datetime



class OrderDetailModel(db.Model):
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
        backref=db.backref('details', lazy='subquery')
    )

    def __init__(self, product_id, detail_price, quantity,
        description, details=None, created=False):
        if not details:
            self.details = []
        else:
            self.details = details
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
            'product': self.product.json()
        }

    def details_json(self):
        return {
            'detail_id': self.detail_id,
            'order_id': self.order_id,
            'detail_price': self.detail_price,
            'created': self.created,
            'quantity': self.quantity,
            'description': self.description,
            'product': self.product.details_json()
        }

class OrderModel(db.Model):
    __tablename__ ="customer_order"

    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, nullable=False,
        default=datetime.now)
    customer_name = db.Column(db.String, nullable=False, default="")
    description = db.Column(db.Text, default="")
    net_price = db.Column(db.Float(precision=2), nullable=False, default=0)

    def __init__(self, customer_name, description, net_price):
        self.customer_name = customer_name
        self.description = description
        self.net_price = net_price

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def json(self):
        return {
            'id': self.id,
            'customer_name': self.customer_name,
            'date_created': self.date_created.strftime('%B %d, %Y'),
            'description': self.description,
            'net_price': self.net_price,
            'details': [detail.details_json() for detail in self.details]
        }

    def details_json(self):
        return {
            'id': self.id,
            'customer_name': self.customer_name,
            'date_created': self.date_created.strftime('%B %d, %Y'),
            'description': self.description,
            'net_price': self.net_price,
            'details': [detail.details_json() for detail in self.details]
        }

    @classmethod
    def get_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def get_all(cls):
        return cls.query.all()