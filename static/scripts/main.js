//좋아요 상위 4개 요리 가져오기
function get_Favorite() {
    $.ajax({
        type:'GET',
        url: '/rank/favorite?sample_give=샘플데이터', //레시피 가져올 url  필요
        data:{},
        success: function (response){
            let favorite_list = response['favorite_Lists']
            for (let i = 0; i < favorite_list.length; i++ ) {
                let name = favorite_list[i]['name']
                let like = favorite_list[i]['like']

                let temp_html = `
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
                                `

                $('#favorite-dishes').append(temp_html)
            }

        }
    })

}

// 재료 담을 리스트 생성
let ing_list = [];

// 선택 버튼 누르면 동작하는 함수
function add_ing_list() {
    let item = document.getElementById("ingredient").value;
    console.log(item)
    ing_list.push(item);

    let selected_box = $("#selected");
    selected_box.show();

    let item_list = $("#selected-item-list");
    item_list.append("<li>" + item + "</li>");

    $("#ingredient").val("")



}


function to_recommend() {

    // console.log(ing_list)

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



