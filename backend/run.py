import os
import sys
sys.path.insert(0, os.getcwd())

from disoltano import create_app

app = create_app()


if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=True, port=5000)