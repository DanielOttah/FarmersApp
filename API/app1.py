import os
from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from farmers import Farmers
import sqlite3


app = Flask(__name__)
app.secret_key = os.urandom(16)
CORS(app, supports_credentials=True)

table = {}


@app.route("/")
def helloWorld():
    return "Hello World!"


@app.route("/farmers")
def getFarmers():
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()
    rowCount = 0
    for row in cursor.execute("SELECT * FROM farmers"):
        rowCount += 1
        table[rowCount] = buildDict(row).json()
    connection.commit()
    connection.close()
    # return jsonify({"data": table})
    return table


class buildDict():
    def __init__(self, row):
        self.id = row[0]
        self.name = row[1]
        self.address = row[2]
        self.contact = row[3]
        self.latitude = row[4]
        self.longitude = row[5]

    def json(self):
        return {'name': self.name,
                'address': self.address,
                'contact': self.contact,
                'latitude': self.latitude,
                'longitude': self.longitude}


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)  # important to mention debug=True
