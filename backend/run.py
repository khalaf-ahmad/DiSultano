from disoltano import create_app
from disoltano.extensions_init import socketio

app = create_app()

if __name__ == "__main__":
  socketio.run(app, host='0.0.0.0',debug=True, port=5000)