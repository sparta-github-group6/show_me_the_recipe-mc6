from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)


# client = MongoClient('', )
# db = client.dbreceipe

# HTML 화면 표시
@app.route('/')
def init():
    return render_template('index.html')


@app.route('/about')
def about_page():
    return render_template('about.html')


@app.route('/recommend')
def recommend_page():
    return render_template('recommend.html')


@app.route('/recipe')
def recipe_page():
    return render_template('recipe.html')


@app.route('/rank')
def rank_page():
    return render_template('rank.html')


# 요리 레시피 요청


# 추천 요리 표시


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
