$(document).ready(() => {
    //유저 정보 표시
    show_user();
    //즐겨찾기 목록 표시
    show_favorite();
})

function show_user(){
    $('.user-info').empty();
        $.ajax({
            type: 'GET',
            url: '/', //유저 정보 가져올 url 필요
            data: {id},
            success: function (response) {
                let userInfo = response['user_data']
                let name = userInfo[i]['name']
                let email = userInfo[i]['like']
    
                    let temp_html = `<div class="user-info">
                                        <h3>${name}</h3>
                                        <h3>${email}</h3>    
                                    </div>`
                    $('.user-info').append(temp_html)
                
    
            }
        })    
}

function show_favorite(){

    $('#star-list').empty();
        $.ajax({
            type: 'GET',
            url: '', //즐겨찾기 가져올 url  필요
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
    
                                    </div>`
                    $('#star-list').append(temp_html)
                }
    
            }
        })    
    }
