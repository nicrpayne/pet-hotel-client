import os

from flask import Flask, request, make_response, jsonify
import psycopg2
import json

app = Flask(__name__)

conn = psycopg2.connect(database='pet-hotel', user='nicp', password='', host='localhost', port='5432')
cursor = conn.cursor()

@app.route('/hello')
def hello():
    query = 'SELECT * FROM "owners";'
    
    cursor.execute(query)
    conn.commit()
    body = ()
    for taco in cursor:
        print(taco)
        body = body + taco
    # print('body: ' + body)
    returnString = jsonify(body)
    print(returnString)
    return jsonify(body)

@app.route('/owners/<jsdata>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def routestuff(jsdata):
    print('in route')
    print(jsdata)
    if request.method == 'GET':
        return 'Hello GET route'
    if request.method == 'POST':
        dataDict = json.loads(jsdata)  #this should work after stringifying it on the client side
        print(dataDict)
        print(dataDict['name'])
        query = """INSERT INTO "pets" ("name", "breed", "color") VALUES (%s, %s, %s);"""
        cursor.execute(query, (dataDict['name'], dataDict['breed'], dataDict['color']))
        conn.commit()
        return 'Hello POST route'

@app.route('/', methods=['GET'])
def jjfunk():
    print('in route')
    print()
    if request.method == 'GET':
        query = 'SELECT * FROM "pets";'
        cursor.execute(query)
        results = cursor.fetchAll();

        # print(cursor)
        conn.commit();
        return jsonify(results)





        

     


