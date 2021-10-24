
$(document).ready(() => {
    showAllList();
})

function showAllList() {
    $.ajax({
        type:'GET',
        url: '', //레시피 가져올 url  필요
        data:{},
        success: function (response){
            let recipeList = response['recipe_lists']
            for( let i = 0; i< recipeList.length; i++){
                let title = recipeList[i]['title']
                let img_url = recipeList[i]['img_url']
                let url  = recipeList[i]['url']

                let temp_html = `<div class="card-cook">
                                    <div class="card-cook-image">
                                        <img src="${img_url}" alt="" class="">
                                    </div>
                                    <div class="card-cook-title">
                                        <h3>${title}</h3>
                                    </div>
                                    <div class="card-cook-footer">
                                        <button class="btn-rank-recipe" onclick="">레시피 보기</button>
                                    </div>

                </div>`

                $('#cook-list').append(temp_html)
            }

        }
    })

}