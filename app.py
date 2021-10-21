from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)
# client = MongoClient('', )
# db = client.dbreceipe

#HTML 화면 표시
@app.route('/')
def init():
    return render_template('index.html')

#요리 레시피 요청


#추천 요리 표시


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)