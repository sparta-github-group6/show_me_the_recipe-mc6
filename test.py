from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient


# client = MongoClient('mongodb://test:test@localhost', 27017)
client = MongoClient("localhost", 27017)
db = client.dbmaking

doc = {"user_id": "test", "user_pw": "test"}

db.users.insert_one(doc)
