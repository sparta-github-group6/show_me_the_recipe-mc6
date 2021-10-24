from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('localhost', 27017)
db = client.dbreceipe


# HTML 화면 표시
@app.route('/')
def init():
    return render_template('index.html')


# 멤버 소개 페이지
@app.route('/about')
def about_page():
    return render_template('about.html')


# 전체 요리 레시피 순위 페이지
@app.route('/rank')
def rank_page():
    return render_template('rank.html')


# 요리 레시피 리스트 요청
@app.route('/recommend')
def recommend_page():
    return render_template('recommend.html')


@app.route('/recipe')
def recipe_page():
    return render_template('recipe.html')


@app.route('/api/recipes', methods=['POST'])
def like_star():
    name_receive = request.form['name_give']

    target_star = db.recipes.find_one({'name': name_receive})
    current_like = target_star['like']

    new_like = current_like + 1

    db.recipes.update_one({'name': name_receive}, {'$set': {'like': new_like}})

    return jsonify({'msg': '좋아요 완료!'})


# 요리 레시피 요청
# @app.route('/recipe', methods=['GET'])
# def show_recipe():
#     sample_receive = request.args.get('sample_give')
#     print(sample_receive)
#     return jsonify({'msg': 'list 연결되었습니다!'})

@app.route('/recipe', methods=['GET'])
def recipe():
    name_receive = db.recipes.find_one({'name': "계란찜 [Gyeran-jjim]"})
    print(name_receive)
    return jsonify({'msg': 'list 연결되었습니다!'})


# 추천 요리 표시


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
