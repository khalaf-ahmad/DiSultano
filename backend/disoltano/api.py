from flask_restful import Api
from backend.disoltano.resources.user import Registration, Users

# create api variable to make restful api's and endpoints
api = Api()

# adding resources
api.add_resource(Registration, '/user')
api.add_resource(Users, '/users')