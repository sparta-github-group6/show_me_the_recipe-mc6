$(document).ready(function () {
    get_Favorite();
    // get_userId();
});

//좋아요 상위 4개 요리 가져오기
function get_Favorite() {
    $.ajax({
        type: 'GET',
        url: '/rank/favorite', //레시피 가져올 url  필요
        data: {},
        success: function (response) {
            let favorite_list = response['favorite_Lists']
            for (let i = 0; i < favorite_list.length; i++) {
                let name = favorite_list[i]['name']
                let like = favorite_list[i]['like']

                let temp_html = `<a href="/recipe" onclick="index_search_recipe('${name}')">
                                    <div>
                                        <div class="favorite-card-cook">
                                            <div>
                                                <img src="../static/recipe-image/${name}.png" class="favorite-dishes" alt="인기 메뉴">
                                            </div>
                                            <div class="rank-card-cook-title">
                                                <h3>${name}</h3>
                                            </div>
                                    
                                            <div class="favorite-card-cook-like">
                                                <h3><i class="fas fa-thumbs-up"></i>  ${like}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </a>`

                $('#favorite-dishes').append(temp_html)
            }

        }
    })

}

function get_userId() {
}

// 재료 담을 리스트 생성
let ing_list = [];
let count = 1;

// 선택 버튼 누르면 동작하는 함수
function add_ing_list() {
    let name = $('#ingredient').val();
    if (name === '') {
        alert('재료를 입력해주세요.');
    } else {
        let item = document.getElementById("ingredient").value;
        console.log(item)
        ing_list.push(item);

        let selected_box = $("#selected");
        selected_box.show();

        let item_list = $("#selected-item-list");


        // item_list.append("<li class='sel_item'>" + item + "</li>");
        let temp_html = `<li id="sel_item${count}">${item}<button class="btn-main del_item" onclick="delete_item(${count})"><i class="fas fa-times del_item"></i></button></li>`
        item_list.append(temp_html)

        $("#ingredient").val("")
        count++;
    }
}

function delete_list() {
    $("#selected-item-list").empty();
    ing_list = [];
}

function delete_item(count) {
    let del = '#sel_item' + String(count)
    let del2 = $(del).text();
    $(del).remove();
    const idx = ing_list.indexOf(del2)
    ing_list.splice(idx, 1)
}


function to_recommend() {
    if (ing_list.length < 1) {
        alert('재료 목록이 비었습니다.')
    } else {

        $.ajax({
            type: "POST",
            url: "/recommend/search",
            data: {ing_list},
            traditional: true,
            success: function (response) {
            }
        })
        location.href = "/recommend";
    }
}

function index_search_recipe(name) {
    $.ajax({
        type: "POST",
        url: "/recommend/search2",
        data: {name_give: name},
        success: function (response) {
        }
    })
}





