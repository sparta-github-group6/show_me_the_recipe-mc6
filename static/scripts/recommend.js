$(document).ready(function () {
  get_ingredients();
});

// 재료 목록 가져오기
function get_ingredients() {
  let item_list = $("#selected-ingredients-list");
  item_list.append("<li>" + ing_list + "</li>");

  favo_recoomend();
}

function favo_recoomend() {
  $.ajax({
    type: "GET",
    url: "/recommend/user",
    data: {},
    success: function (response) {
      sessionStorage.setItem("favorite", response["favorite"]);
      recommend();
    },
  });
}

function recommend() {
  $.ajax({
    type: "GET",
    url: "/recommend/read",
    data: { ing_list },
    success: function (response) {
      let recipes = response["recipes"];
      let favorite = sessionStorage.getItem("favorite").split(",");

      if (recipes.length == 0) {
        $(".recipe-box").append("재료에 해당하는 레시피가 없습니다.")
      }

      for (let i = 0; i < recipes.length; i++) {
        let ing = recipes[i]["ingredients"];
        var name = recipes[i]["name"];
        let like = recipes[i]["like"];

        let temp_html = `<a href="/recipe" onclick="search_recipe('${name}')">
                                    <div class="recipes_all_about">
                                        <div class="recipes_img">
                                            <img src="../static/recipe-image/${name}.png" class="list-img-cook" alt="요리 이미지">
                                        </div>
                
                                        <div class="recipes_information">
                                            <div class="recipes_title" id="index${i}">
                                                <h3> ${name} </h3>
                                            </div>
                
                                            <div class="recipes_desc">
                                                <p>
                                                    재료 : ${ing}
                                                </p>
                                            </div>
                
                                            <div class="recipes_like">
                                            <footer class="card-footer">
                                                    <a onclick="likeStar('${name}')" class="card-footer-item">
                                                    ${like}
                                                        <span class="icon">
                                                            <i class="fas fa-thumbs-up"></i>
                                                        </span>
                                                    </a>
                                                    <a onclick="hateStar('${name}')" class="card-footer-item">
                                                        <span class="icon">
                                                            <i class="fas fa-thumbs-down"></i>
                                                        </span>
                                                    </a>
                                                    <a onclick="add_favorite('${name}'); toggle_star('${i}')" class="card-footer-item">
                                                        <span class="icon" id="star_btn${i}">
                                                        <i class="far fa-star" id="blank_star${i}"></i>
                                                        <i class="fas fa-star" id="good_star${i}"></i>
                                                        </span>
                                                    </a>
                                            </footer>
                                        </div>
                                    </div>
                                </a>`;

        $(".recipe-box").append(temp_html);
        var bs = "#blank_star" + String(i);
        var gs = "#good_star" + String(i);

        if (favorite.indexOf(name) == -1) {
          $(bs).show();
          $(gs).hide();
        } else {
          $(gs).show();
          $(bs).hide();
        }
      }
    },
  });
  ingredients();
}

function ingredients() {
  $.ajax({
    type: "GET",
    url: "/recommend/ingredient",
    data: {},
    success: function (response) {
      let ingredients = response["ing"]["index"];
      for (let i = 0; i < ingredients.length; i++) {
        let item = ingredients[i];
        let temp_html = `<li class="list-style"> ${item} </li>`;
        $(".selected-ingredients").append(temp_html);
      }
    },
  });
}

function likeStar(name) {
  $.ajax({
    type: "POST",
    url: "/recipe/like",
    data: { name_give: name },
    success: function (response) {
      alert(response["msg"]);
      window.location.reload();
    },
  });
}

function hateStar(name) {
  $.ajax({
    type: "POST",
    url: "/recipe/hate",
    data: { name_give: name },
    success: function (response) {
      alert(response["msg"]);
      window.location.reload();
    },
  });
}

function add_favorite(name) {
  $.ajax({
    type: "POST",
    url: "/favorite",
    data: { recipe_give: name },
    success: function (response) {
      alert(response["msg"]);
    },
  });
}

function toggle_star(num) {
  if (window.sessionStorage.getItem("login_check") == "good") {
    let bs = "#blank_star" + String(num);
    let gs = "#good_star" + String(num);
      if ($(bs).css("display") == "none") {
          $(bs).show();
          $(gs).hide();
      } else {
          $(gs).show();
          $(bs).hide();
      }
  }
}
