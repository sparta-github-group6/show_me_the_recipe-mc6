from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    session,
    escape,
    redirect,
    url_for,
)
from pymongo import MongoClient

app = Flask(__name__)

# client = MongoClient('mongodb://test:test@localhost', 27017)
client = MongoClient("localhost", 27017)
db = client.dbmaking

app.secret_key = "ABCDEFG"

# HTML 화면 표시
@app.route("/")
def init():
    return render_template("index.html")


# 회원가입 페이지
@app.route("/register")
def sign_up():
    return render_template("register.html")


# 로그인 페이지
@app.route("/login")
def sign_in():
    return render_template("login.html")


# 멤버 소개 페이지
@app.route("/about")
def about_page():
    return render_template("about.html")


# 전체 요리 레시피 순위 페이지
@app.route("/rank")
def rank_page():
    return render_template("rank.html")


# 요리 레시피 리스트 요청
@app.route("/recommend")
def recommend_page():
    return render_template("recommend.html")


# 요리 레시피 상세페이지
@app.route("/recipe")
def recipe_page():
    return render_template("recipe.html")


# 요리 레시피 추가
@app.route("/recipe/new")
def recipe_add_page():
    return render_template("add_recipe.html")


# 마이페이지
@app.route("/my")
def my_page():
    return render_template("mypage.html")


# 상위 레시피 표시 API
@app.route("/rank/favorite", methods=["GET"])
def show_favorite():
    favorite_list = list(db.recipes.find({}, {"_id": False}).sort("like", -1).limit(4))
    return jsonify({"favorite_Lists": favorite_list})


# 랭크 페이지 좋아요순 정렬 API
@app.route("/rank/list", methods=["GET"])
def show_rank():
    recipe_list = list(db.recipes.find({}, {"_id": False}).sort("like", -1))
    return jsonify({"recipe_Lists": recipe_list})


# 랭크 페이지 가나다순 정렬 API
@app.route("/rank/sort", methods=["GET"])
def show_sort():
    sort_list = list(db.recipes.find({}, {"_id": False}).sort("name", 1))
    return jsonify({"sort_lists": sort_list})


# 검색 재료 선택 도우미 API
@app.route("/recommend/search", methods=["POST"])
def search_1to2():
    ingredients = request.form
    ingredients = ingredients.getlist("ing_list")
    db.search.update_one({"name": "검색"}, {"$set": {"index": ingredients}})
    return jsonify({"msg": "저장"})


# 재료로 레시피 검색 API
@app.route("/recommend/read", methods=["GET"])
def search():
    try:
        search = db.search.find_one({"name": "검색"})
        # 좋아요 있는 경우
        # if :
        # 좋아요 없는 경우
        # else:
        recipes = list(
            db.recipes.find({"search": {"$all": search["index"]}}, {"_id": False}).sort(
                "like", -1
            )
        )
    except Exception:
        return jsonify({"msg": "없는 재료 입니다."})

    if search is None:
        return jsonify({"msg": "없는 재료 입니다."})
    # recipes = list(db.recipes.find({'search':ingredients},{'_id':False}))
    # recipes = list(db.recipes.find({'search':search['index']},{'_id':False}))
    return jsonify({"recipes": recipes})


@app.route("/recommend/user", methods=["GET"])
def user_favorite():
    search = db.users.find_one({"user_id": session["user_id"]})
    search = search["favorite"]

    return jsonify({"favorite": search})


@app.route("/recommend/ingredient", methods=["GET"])
def search_ing():
    search = db.search.find_one({"name": "검색"}, {"_id": False})
    return jsonify({"ing": search})


@app.route("/recommend/search2", methods=["POST"])
def search_2to3():
    name = request.form["name_give"]
    db.search.update_one({"name": "검색2"}, {"$set": {"index": name}})
    return jsonify({"msg": "저장"})


@app.route("/recipe/read", methods=["GET"])
def search2():
    search = db.search.find_one({"name": "검색2"})
    # recipes = list(db.recipes.find({'search': {'$all':ingredients}},{'_id':False}))
    # recipes = list(db.recipes.find({'search':ingredients},{'_id':False}))
    recipe = db.recipes.find_one({"name": search["index"]}, {"_id": False})
    return jsonify({"recipes": recipe})


# 요리 레시피 요청
# @app.route('/recipe', methods=['GET'])
# def show_recipe():
#     sample_receive = request.args.get('sample_give')
#     print(sample_receive)
#     return jsonify({'msg': 'list 연결되었습니다!'})


# ingredients = ['계란','물','소금']
# test = list(db.recipes.find({'search': {'$all':ingredients}},{'_id':False}))
# print(test,len(test))

# 좋아요
@app.route("/recipe/like", methods=["POST"])
def like_star():
    name_receive = request.form["name_give"]

    target_star = db.recipes.find_one({"name": name_receive})
    current_like = target_star["like"]

    new_like = current_like + 1

    db.recipes.update_one({"name": name_receive}, {"$set": {"like": new_like}})

    return jsonify({"msg": "좋아요!"})


# 싫어요
@app.route("/recipe/hate", methods=["POST"])
def hate_star():
    name_receive = request.form["name_give"]

    target_star = db.recipes.find_one({"name": name_receive})
    current_like = target_star["like"]

    hate_like = current_like - 1

    db.recipes.update_one({"name": name_receive}, {"$set": {"like": hate_like}})

    return jsonify({"msg": "싫어요!"})


# 로그인
@app.route("/login/check", methods=["POST"])
def login():
    userid_receive = request.form["userid_give"]
    userpw_receive = request.form["userpw_give"]

    try:
        target = db.users.find_one(
            {"user_id": userid_receive, "user_pw": userpw_receive}, {"_id": False}
        )
    except Exception as e:
        return {"message": "failed to login"}, 401

    if target is not None:
        session["user_id"] = target.get("user_id")
    return {"user_data": target}, 200


# 로그아웃
@app.route("/logout", methods=["GET"])
def logout():
    session.pop("user_id", None)
    return redirect(url_for("init"))


# 회원가입
@app.route("/register/add", methods=["POST"])
def register():
    userid_receive = request.form["userid_give"]
    userpw_receive = request.form["userpw_give"]
    usermail_receive = request.form["usermail_give"]

    doc = {
        "user_id": userid_receive,
        "user_pw": userpw_receive,
        "user_mail": usermail_receive,
    }

    db.users.insert_one(doc)

    return jsonify({"msg": "가입완료"})


# 즐겨찾기
@app.route("/favorite", methods=["POST"])
def favorite():

    try:
        recipe_receive = request.form["recipe_give"]
        favorite = db.users.find_one({"user_id": session["user_id"]}, {"_id": False})[
            "favorite"
        ]
        if recipe_receive in favorite:
            db.users.update_one(
                {"user_id": session["user_id"]}, {"$pull": {"favorite": recipe_receive}}
            )
            return jsonify({"msg": "삭제 완료"})
        else:
            db.users.update_one(
                {"user_id": session["user_id"]}, {"$push": {"favorite": recipe_receive}}
            )
            return jsonify({"msg": "추가 완료"})
    except Exception:
        return jsonify({"msg": "로그인이 필요합니다."})


# 마이페이지에서 즐겨찾기 삭제
@app.route("/favorite/delete", methods=["POST"])
def delete():

    try:
        recipe_receive = request.form["recipe_give"]

        db.users.update_one(
            {"user_id": session["user_id"]}, {"$pull": {"favorite": recipe_receive}}
        )

    except Exception:
        return jsonify({"msg": "로그인이 필요합니다."})

    return jsonify({"msg": "삭제 완료"})


# 마이페이지
@app.route("/my/user", methods=["GET"])
def call_user():

    try:
        target = db.users.find_one({"user_id": session["user_id"]}, {"_id": False})
    except Exception as e:
        return {"message": "failed to search"}, 401

    # if target is not None:
    # session["user_id"] = target.get("user_id")
    return {"user_data": target}, 200


# 추천 요리 표시

if __name__ == "__main__":
    app.run("0.0.0.0", port=5000, debug=True)
