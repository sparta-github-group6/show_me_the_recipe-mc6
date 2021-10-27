$(document).ready(() => {
    show_rank();
})

function show_rank() {
    $('#cook-list').empty();
    $.ajax({
        type: 'GET',
        url: '/rank/list?sample_give=샘플데이터', //레시피 가져올 url  필요
        data: {},
        success: function (response) {
            let recipeList = response['recipe_Lists']
            for (let i = 0; i < recipeList.length; i++) {
                let name = recipeList[i]['name']
                let like = recipeList[i]['like']

                let temp_html = `<div class="rank-card-cook">
                                    <div>
                                        <img src="../static/recipe-image/${name}.png" class="rank-card-cook-image" alt="cook image">
                                    </div>
                    
                                    <div class="rank-card-cook-title">
                                        <h3>${name}</h3>
                                    </div>
                                    
                                    <div class="rank-card-cook-footer">
                                        <a href="/recipe" onclick="rank_search_recipe('${name}')">
                                            레시피 보기
                                        </a>
                                    </div>

                                    <div class="favorite-card-cook-like"> 
                                        <h3><i class="fas fa-thumbs-up"></i> ${like}</h3>
                                    </div>
                                </div>`


                $('#cook-list').append(temp_html)
            }

        }
    })
}

function show_sort() {
    console.log("가나다순 실행");
    $('#cook-list').empty();
    $.ajax({
        type: 'GET',
        url: '/rank/sort?sample_give=샘플데이터', //레시피 가져올 url  필요
        data: {},
        success: function (response) {
            console.log(response)
            let recipeList = response['sort_lists']
            for (let i = 0; i < recipeList.length; i++) {
                let name = recipeList[i]['name']
                let like = recipeList[i]['like']
                let temp_html = `<a href="/recipe"><div class="rank-card-cook">
                                    <div>
                                        <img src="../static/recipe-image/${name}.png" class="rank-card-cook-image" alt="cook_image">
                                    </div>

                                    <div class="rank-card-cook-title">
                                        <h3>${name}</h3>
                                    </div>

                                    <div class="rank-card-cook-footer">
                                        <a href="/recipe" onclick="rank_search_recipe('${name}')">
                                            레시피 보기
                                        </a>
                                    </div>
                                    
                                    <div class="favorite-card-cook-like"> 
                                        <h3><i class="fas fa-thumbs-up"></i> ${like}</h3>
                                    </div>
                                    
                                </a>`
                $('#cook-list').append(temp_html)
            }
        }
    })
}

function rank_search_recipe(name) {
    $.ajax({
        type: "POST",
        url: "/recommend/search2",
        data: {name_give: name},
        success: function (response) {
        }
    })
}
