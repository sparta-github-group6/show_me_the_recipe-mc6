$(document).ready(() => {
    show_rank();
})

function show_rank() {
  $('#cook-list').empty();
    $.ajax({
        type:'GET',
        url: '/rank/list?sample_give=샘플데이터', //레시피 가져올 url  필요
        data:{},
        success: function (response){
            let recipeList = response['recipe_Lists']
            for (let i = 0; i < recipeList.length; i++ ) {
                let name = recipeList[i]['name']

                let temp_html = `<div class="rank-card-cook">
                                    <div>
                                        <img src="../static/recipe-image/${name}.png" class="rank-card-cook-image">
                                    </div>
                    
                                    <div class="rank-card-cook-title">
                                        <h3>${name}</h3>
                                    </div>
                    
                                    <div class="rank-card-cook-footer">
                                        <a class="btn-rank-recipe" href="/recipe">
                                            레시피 보기
                                        </a>
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
        type:'GET',
        url: '/rank/sort?sample_give=샘플데이터', //레시피 가져올 url  필요
        data:{},
        success: function (response){
            console.log(response)
            let recipeList = response['sort_lists']
            for (let i = 0; i < recipeList.length; i++ ) {
                let name = recipeList[i]['name']
                let temp_html = `<a href="/recipe"><div class="rank-card-cook">
                                    <div>
                                        <img src="../static/recipe-image/${name}.png" class="rank-card-cook-image">
                                    </div>

                                    <div class="rank-card-cook-title">
                                        <h3>${name}</h3>
                                    </div>

                                    <div class="rank-card-cook-footer">
                                        <a class="btn-rank-recipe" href="/recipe">
                                            레시피 보기
                                        </a>
                                    </div>

                                </div></a>`

                $('#cook-list').append(temp_html)
            }
        }
    })
}


