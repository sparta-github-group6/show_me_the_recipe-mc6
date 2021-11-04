        $(document).ready(function () {
            get_ingredients();
        });

// 재료 목록 가져오기
function get_ingredients(){
    console.log(ing_list)
    let item_list = $("#selected-ingredients-list");
    item_list.append("<li>"+ing_list+"</li>");

    recommend();

}
// 레시피 추천
function recommend() {
    $.ajax({
        type: "GET",
        url: "/recommend/read",
        data: {ing_list},
        success: function (response) {
            let recipes = response['recipes']
            for (let i = 0; i < recipes.length; i++) {
                let ing = recipes[i]['ingredients']
                let name = recipes[i]['name']
                let like = recipes[i]['like']

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
                                                    <a href="#" onclick="likeStar('${name}')" class="card-footer-item has-text-info">
                                                    ${like}
                                                        <span class="icon">
                                                            <i class="fas fa-thumbs-up"></i>
                                                        </span>
                                                    </a>
                                                    <a href="#" onclick="hateStar('${name}')" class="card-footer-item has-text-danger">
                                                        <span class="icon">
                                                            <i class="fas fa-thumbs-down"></i>
                                                        </span>
                                                    </a>
                                                    <a href="#" onclick="add_favorite('${name}')" class="card-footer-item has-text-info">
                                                        <span class="icon">            
                                                        <i class="far fa-star i_favorite"></i>
                                                    </span>
                                                    </a>


                                            </footer>
                                        </div>
                                    </div>
                                </a>`

                $('.recipe-box').append(temp_html)
            }
        ingredients()
        }
    })
}

function ingredients() {
    $.ajax({
        type: "GET",
        url: "/recommend/ingredient",
        data: {},
        success: function (response) {
            let ingredients = response['ing']['index']
            for (let i = 0; i < ingredients.length; i++) {
                let item = ingredients[i]
                let temp_html = `<li class="list-style"> ${item} </li>`
                $('.selected-ingredients').append(temp_html)
            }
        }
    })
}

function likeStar(name) {
                $.ajax({
                    type: 'POST',
                    url: '/recipe/like',
                    data: {name_give:name},
                    success: function (response) {
                        alert(response['msg']);
                        window.location.reload()
                    }
                });
            }

function hateStar(name) {
                $.ajax({
                    type: 'POST',
                    url: '/recipe/hate',
                    data: {name_give:name},
                    success: function (response) {
                        alert(response['msg']);
                        window.location.reload()
                    }
                });
            }

function search_recipe(name){
    $.ajax({
        type: "POST",
        url: "/recommend/search2",
        data: {name_give: name},
        success: function (response) {
            }
    })
}


function add_favorite(name){
    $.ajax({
        type: "POST",
        url: "/favorite",
        data: {recipe_give: name},
        success: function (response) {

            alert(response["msg"]);
            show_star();
            
        }
    })
}

function show_star(){
    $('.i_favorite').on('click', function(){
        $(this).toggleClass('active');
    })
    window.location.reload()
}

