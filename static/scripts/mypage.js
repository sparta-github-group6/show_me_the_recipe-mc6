$(document).ready(() => {
    //유저 정보 표시
    show_user();
    //즐겨찾기 목록 표시
    // show_favorite();
})

function show_user(){
    $('.user').empty();
        $.ajax({
            type: 'GET',
            url: '/my/user', //유저 정보 가져올 url 필요
            data: {},
            success: function (response) {
                console.log(response)
                let userInfo = response['user_data']
                let name = userInfo['user_id']
                let email = userInfo['user_mail']
                let fav = userInfo['favorite']
    
                let temp_html = `<div class="user-info">
                                    <h3>${name}</h3>
                                    <h3>${email}</h3>    
                                </div>`
                $('.user').append(temp_html)

                for (let i = 0; i < fav.length; i++) {
                    let temp_html2 = `<div class="rank-card-cook">
                                        <div>
                                            <img src="../static/recipe-image/${fav[i]}.png" class="rank-card-cook-image" alt="cook image" onclick="search_recipe('${fav[i]}')">
                                        </div>
    
                                        <div class="rank-card-cook-title">
                                            <h3>${fav[i]}</h3>
                                        </div>
    
                                    </div>`
                    $('.star-list').append(temp_html2)
                }
            }
        })    
}

function search_recipe(name) {
    $.ajax({
        type: "POST",
        url: "/recommend/search2",
        data: {name_give: name},
        success: function (response) {
        }
    })
    window.location.href = '/recipe';
}

// function show_favorite(){

//     $('#star-list').empty();
//         $.ajax({
//             type: 'GET',
//             url: '', //즐겨찾기 가져올 url  필요
//             data: {},
//             success: function (response) {
//                 let recipeList = response['recipe_Lists']
//                 for (let i = 0; i < recipeList.length; i++) {
//                     let name = recipeList[i]['name']
//                     let like = recipeList[i]['like']
    
//                     let temp_html = `<div class="rank-card-cook">
//                                         <div>
//                                             <img src="../static/recipe-image/${name}.png" class="rank-card-cook-image" alt="cook image">
//                                         </div>
    
//                                         <div class="rank-card-cook-title">
//                                             <h3>${name}</h3>
//                                         </div>
    
//                                     </div>`
//                     $('#star-list').append(temp_html)
//                 }
    
//             }
//         })    
//     }
