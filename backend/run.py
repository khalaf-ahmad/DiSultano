import os
import sys
sys.path.insert(0, os.getcwd())

from backend.disoltano import create_app
from backend.disoltano.extensions_init import socketio

app = create_app()

if __name__ == "__main__":
  socketio.run(app, host='0.0.0.0',debug=True, port=5000)