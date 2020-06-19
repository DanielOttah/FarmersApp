from flask_restful import Resource
import sqlite3

food = {}


class Food(Resource):
    def get(self):
        arr1 = []
        connection = sqlite3.connect('data.db')
        cursor = connection.cursor()
        rowCount = 0
        for row in cursor.execute("SELECT * FROM foodDetails"):
            rowCount += 1
            food[rowCount] = buildDict(row).json()
        connection.commit()
        connection.close()
        return food


class buildDict():
    def __init__(self, row):
        self.id = row[0]
        self.name = row[1]
        self.botname = row[2]
        self.othernames = row[3]
        self.imageurl = row[4]

    def json(self):
        return {'name': self.name,
                'botanicalname': self.botname,
                'othernames': self.othernames,
                'imageurl': self.imageurl}
