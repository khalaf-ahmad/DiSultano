def get_forbidden_error():
  return {
    "message": "you don't have access rights to the content.",
    "error": "request_forbidden"
  }, 403

def get_internal_server_error():
  return {"message": "internal server error!"}, 500

def get_not_found_error(query):
  return {'message': f'{query} not found!'}, 404