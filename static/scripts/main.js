//좋아요 상위 4개 요리 가져오기
function get_Favorite(){

}

// 재료 담을 리스트 생성
var ing_list = [];

// 선택 버튼 누르면 동작하는 함수
function add_ing_list() {
    let item = document.getElementById("ingredient").value;
    console.log(item)
    ing_list.push(item);

    let selected_box = $("#selected");
    selected_box.show();

    let item_list = $("#selected-item-list");
    item_list.append("<li>"+item+"</li>");
}



function to_recommend() {
    var ingredient = $('#ingredient').val();
    $.ajax({
        type: "POST",
        url: "/recommend/search",
        data: {ing_list},
        traditional: true,
        success: function (response) {
            console.log(response)
        }
    })
    var link = "/recommend"
    location.href = link;
}

function recipe() {
    $.ajax({
        type: "GET",
        url: "/recipe/read",
        data: {},
        success: function (response) {
             console.log(response)
            }
    })
}

