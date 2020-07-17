import psycopg2
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_restful import Api
from farmers import buildFarmDict
from products import buildFoodDict


app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'dany'
api = Api(app)

farmers = {}
products = {}


@app.route("/")
def helloWorld():
    return "Welcome to Farmers' Alley App... Enjoy!"


# con = psycopg2.connect(
#     host="localhost",
#     database="ztm_test",
#     user="postgres",
#     password="Leinads"
# )
# cursor = con.cursor()
# query = "SELECT * FROM users;"
# cursor.execute(query)
# rows = cursor.fetchall()

# for r in rows:
#     print(r)

# cursor.close()
# con.close()

# query = "INSERT INTO users (name,etc) VALUES (%s,%s)", ('Daniel','etc')
@app.route("/farmers")
def get_Farm():
    con = psycopg2.connect(
        host="localhost",
        database="Farmers_App",
        user="postgres",
        password="Leinads"
    )
    cursor = con.cursor()
    cursor.execute("SELECT * FROM farms")
    rows = cursor.fetchall()
    rowCount = 0
    for r in rows:
        rowCount += 1
        farmers[rowCount] = buildFarmDict(r).json()
    cursor.close()
    con.close()
    return farmers


@app.route("/food")
def get_Products():
    con = psycopg2.connect(
        host="localhost",
        database="Farmers_App",
        user="postgres",
        password="Leinads"
    )
    cursor = con.cursor()
    cursor.execute("SELECT * FROM products")
    rows = cursor.fetchall()
    rowCount = 0
    for r in rows:
        rowCount += 1
        products[rowCount] = buildFoodDict(r).json()
    cursor.close()
    con.close()
    return products


@app.route("/addfarmer", methods=['POST'])
def post_Farm():
    try:
        reqs = request.get_json()
        con = psycopg2.connect(
            host="localhost",
            database="Farmers_App",
            user="postgres",
            password="Leinads"
        )
        cursor = con.cursor()
        cursor.execute("SELECT * FROM farms")
        dbCount = cursor.fetchall()
        rowCount = 0
        for r in dbCount:
            rowCount += 1
        reqs_lat = float(reqs['lat'])
        reqs_long = float(reqs['long'])
        cursor.execute("INSERT INTO farms (id,name,address,contact,latitude,longitude) VALUES (%s,%s,%s,%s,%s,%s)",
                       (++rowCount, reqs['name'], reqs['address'], reqs['contact'], reqs_lat, reqs_long))
        # cursor.execute("INSERT INTO products (name,botanicalname,imageurl,othernames) VALUES (%s,%s,%s,%s)", (reqs.name,reqs.botanicalname,reqs.imageurl,reqs.othernames))
        con.commit()
        cursor.close()
        con.close()
        return jsonify(reqs)
    except:
        return jsonify("Error adding farmer")


@app.route("/farmer_product", methods=['POST'])
def post_get_Farm():
    data = {}
    try:
        reqs = request.get_json()
        con = psycopg2.connect(
            host="localhost",
            database="Farmers_App",
            user="postgres",
            password="Leinads"
        )
        cursor = con.cursor()
        cursor.execute(
            "SELECT f.name, p.name, price FROM farms AS f JOIN farmer_product ON f.id = farmer_product.farm_id JOIN products AS p ON  farmer_product.product_id= p.id WHERE f.name = %s", (reqs['name'],))
        rows = cursor.fetchall()
        rowCount = 0
        for r in rows:
            rowCount += 1
            data[rowCount] = {"name": r[1], "price": float(r[2])}
            # print(r)
        con.commit()
        cursor.close()
        con.close()
        return jsonify(list(data.values()))
    except:
        return jsonify("Error adding farmer")


@app.route("/del_farmer",  methods=['POST'])
def post_del_Farm():
    try:
        reqs = request.get_json()
        con = psycopg2.connect(
            host="localhost",
            database="Farmers_App",
            user="postgres",
            password="Leinads"
        )
        cursor = con.cursor()
        cursor.execute("DELETE FROM farms WHERE name=%s",
                       (reqs['name'],))
        con.commit()
        cursor.close()
        con.close()
        return jsonify(reqs)
    except:
        return jsonify("Error deleting farmer")


# Delete FROM farms where name='kiki farms';

if __name__ == '__main__':
    # important to mention debug=True
    app.run(port=3500, debug=True, use_reloader=True)
