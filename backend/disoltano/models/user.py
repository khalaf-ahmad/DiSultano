from backend.disoltano.extensions_init import db
from backend.disoltano.utility import UserLevel

class UserModel(db.Model):
  __tablename__= "user"
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(20), nullable=False)
  username = db.Column(db.String(20), unique=True, nullable=False)
  password = db.Column(db.String(60), nullable=False)
  role = db.Column(db.Integer, default=1)
  activated = db.Column(db.Boolean, default=False)
  def __init__(self, name, username, password, role=1, activated=False):
    self.name = name
    self.username = username
    self.password = password
    self.role = role
    self.activated = activated

  def json(self):
    return {
      'id': self.id,
      'name': self.name,
      'username': self.username,
      'role': self.role,
      'activated': self.activated
    }

  def save_to_db(self):
    db.session.add(self)
    db.session.commit()

  def delete_from_db(self):
    db.session.delete(self)
    db.session.commit()

  @classmethod
  def find_by_username(cls, username):
    return cls.query.filter_by(username=username).first()

  @classmethod
  def find_by_id(cls, _id):
    return cls.query.filter_by(id=_id).first()

  @classmethod
  def get_all(cls):
    return cls.query.all()

  @classmethod
  def get_guest_users(cls):
    return cls.query.filter_by(role=UserLevel.GUEST)

  @classmethod
  def get_admin_users(cls):
    return cls.query.filter_by(role=UserLevel.ADMIN)