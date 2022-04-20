from flask import Flask, request
import json

# Setup flask server
app = Flask(__name__)


@app.route('/ML', methods = ['GET'])
def index():
    return "Ubald le bg"

if __name__ == "__main__":
	app.run(port=5000)
