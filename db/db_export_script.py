#!/bin/python
 
import sqlite3
import json

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
 
connection = sqlite3.connect("cma-artworks.db")
connection.row_factory = dict_factory
 
cursor = connection.cursor()

cursor.execute("SELECT DISTINCT artwork.*, creator.role AS creator_role, creator.description AS creator_description, department.name AS department_name FROM (artwork LEFT JOIN artwork__creator ON artwork.id = artwork__creator.artwork_id) LEFT JOIN creator ON (creator.id = artwork__creator.creator_id) LEFT JOIN artwork__department ON artwork.id = artwork__department.artwork_id LEFT JOIN department ON (department.id = artwork__department.department_id);")

# fetch all or one we'll go for all.
results = cursor.fetchall()
 
# print(results)
with open('result.json', 'w') as fp:
    json.dump(results, fp)
 
connection.close()