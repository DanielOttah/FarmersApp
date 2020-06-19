from flask_restful import Resource, reqparse
import sqlite3
# from flask import jsonify

table = {}


class Farmers(Resource):
    def get(self):
        arr1 = []
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
        self.latitude = row[5]
        self.longitude = row[4]

    def json(self):
        return {'name': self.name,
                'address': self.address,
                'contact': self.contact,
                'latitude': self.latitude,
                'longitude': self.longitude}
