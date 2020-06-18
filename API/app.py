import os
from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from farmers import Farmers


app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'dany'
api = Api(app)


# @app.route("/")
# def helloWorld():
#     return Farmers.get()


api.add_resource(Farmers, '/farmers')

if __name__ == '__main__':
    # important to mention debug=True
    app.run(port=3500, debug=True, use_reloader=True)
