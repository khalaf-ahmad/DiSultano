from disultano.extensions_init import db, socketio
from disultano.models.Model import BaseModel

_detail_base_query = """
SELECT d.detail_id, d.created, d.description, p.name, d.order_id,
o.customer_name, o.date_created, d.quantity
From order_detail as d  
Join customer_order as o on o.id = d.order_id
Join product as p on p.id = d.product_id 
{}
Where d.created = :created
Order by o.date_created DESC
"""

_user_detail_query = _detail_base_query.format("""
Join (
    SELECT product_id , receiver_id 
    From product_receivers 
    group by product_id, receiver_id
  ) as pr on pr.product_id = d.product_id and pr.receiver_id = :user_id 
""")

_admin_detail_query = _detail_base_query.format("""
Join (
    SELECT DISTINCT product_id  
    From product_receivers 
    group by product_id
  ) as pr on pr.product_id = d.product_id
""")

class OrderDetailModel(db.Model, BaseModel):
  __tablename__ = "order_detail"

  detail_id = db.Column(db.Integer, primary_key=True)
  product_id = db.Column(db.ForeignKey('product.id'), nullable=False)
  order_id = db.Column(db.ForeignKey('customer_order.id'), nullable=False)
  user_id = db.Column(db.ForeignKey('user.id'), nullable=False)
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
    description, user_id, created=False):
    self.product_id = product_id
    self.order_id
    self.detail_price = detail_price
    self.quantity = quantity
    self.description = description
    self.created = created
    self.user_id = user_id

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

  @classmethod
  def _fetch_data(cls, query, params):
      result = db.session.execute(query, params)
      return [{
        "detail_id": row["detail_id"],
        "created": row["created"],
        "description": row["description"],
        "name": row["name"],
        "order_id": row["order_id"],
        "customer_name": row["customer_name"],
        "date_created": str(row['date_created']),
        "quantity": row["quantity"]
      } for row in result]

  @classmethod
  def user_created_details(cls, user_id, page, per_page):
    query = cls._add_limit_to_query(_user_detail_query, page, per_page)
    return cls._fetch_data(query, {'user_id': user_id, 'created': True})

  @classmethod
  def user_waiting_details(cls, user_id):
    return cls._fetch_data(_user_detail_query, {'user_id': user_id, 'created': False})

  @classmethod
  def admin_created_details(cls, page, per_page):
    query = cls._add_limit_to_query(_admin_detail_query, page,per_page)
    return cls._fetch_data(query, {'created': True})

  @classmethod
  def admin_waiting_details(cls):
    return cls._fetch_data(_admin_detail_query, {'created': False})

  @classmethod
  def _add_limit_to_query(cls, query, page, per_page):
    return f"""{query} 
    LIMIT {per_page}  OFFSET {(page-1)*per_page}"""

  def save_to_db(self):
    super().save_to_db()
    socketio.emit('fetch_details', broadcast=True)