from flask_restful import Resource
import sqlite3
import psycopg2
# from flask import jsonify

farmers = {}


class Farmers(Resource):

    def get(self):
        arr1 = []
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()
        rowCount = 0
        for row in cursor.execute("SELECT * FROM farmers"):
            rowCount += 1
            farmers[rowCount] = buildFarmDict(row).json()
        connection.commit()
        connection.close()
        # return jsonify({"data": table})
        return farmers


class buildFarmDict():
    def __init__(self, row):
        self.id = row[0]
        self.name = row[1]
        self.address = row[2]
        self.contact = row[3]
        self.latitude = float(row[5])
        self.longitude = float(row[4])

    def json(self):
        return {'name': self.name,
                'address': self.address,
                'contact': self.contact,
                'latitude': self.latitude,
                'longitude': self.longitude}
