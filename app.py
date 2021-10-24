from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('localhost', 27017)
db = client.dbmaking


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

@app.route('/recommend/search', methods=['POST'])
def search_1to2():
    ingredients = request.form['ing_give']
    db.search.update_one({'name':'검색'},{'$set':{'index':ingredients}})
    return jsonify({'msg': '저장'})


@app.route('/recommend/read', methods=['GET'])
def search2():
    search = db.search.find_one({'name':'검색'})
    # recipes = list(db.recipes.find({'search': {'$all':ingredients}},{'_id':False}))
    # recipes = list(db.recipes.find({'search':ingredients},{'_id':False}))
    recipes = list(db.recipes.find({'search':search['index']},{'_id':False}))
    return jsonify({'recipes': recipes})





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

#
# ingredients = ['계란','물','소금']
# test = list(db.recipes.find({'search': {'$all':ingredients}},{'_id':False}))
# print(test,len(test))



# 추천 요리 표시


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
