from disultano.extensions_init import db

class BaseModel:

  def save_to_db(self):
    db.session.add(self)
    db.session.commit()

  def delete_from_db(self):
    db.session.delete(self)
    db.session.commit()

  @classmethod
  def find_by_id(cls, _id):
    return cls.query.get(_id)

  @classmethod
  def find_by_name(cls, name):
    return cls.query.filter_by(name=name).first()

  @classmethod
  def get_all(cls):
    return cls.query.all()