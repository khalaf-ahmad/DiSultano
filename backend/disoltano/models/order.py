from backend.disoltano.extensions_init import db, socketio
from datetime import datetime
from backend.disoltano.models.Model import BaseModel

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
    socketio.emit('fetch_details', broadcast=True)

  def save_to_db(self):
    super().save_to_db()
    socketio.emit('fetch_details', broadcast=True)

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
