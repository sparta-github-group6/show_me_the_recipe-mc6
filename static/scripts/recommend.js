function get_ingredients(){

}




function recommend() {
    $.ajax({
        type: "GET",
        url: "/recommend/read",
        data: {},
        success: function (response) {
            let recipes = response['recipes']
            for (let i = 0; i < recipes.length; i++) {
                let img = recipes[i]['img']
                let ing = recipes[i]['ingredients']
                let name = recipes[i]['name']

                let temp_html = `<a href="/recipe">
                                    <div class="recipes_all_about">
                
                                        <div class="recipes_img">
                                            <img src="${img}" class="list-img-cook" alt="요리 이미지">
                                        </div>
                
                                        <div class="recipes_information">
                                            <div class="recipes_title" id="index${i}">
                                                <h3>레시피 제목: ${name} </h3>
                                            </div>
                
                                            <div class="recipes_desc">
                                                <h4>레시피 재료</h4>
                                 
                                                <p>
                                                    ${ing}
                                                </p>
                                            </div>
                
                                            <div class="recipes_like"><i class="far fa-thumbs-up"></i> 10 </div>
                                        </div>
                
                                    </div>
                                </a>`

                $('.recipe-box').append(temp_html)
            }
        }
    })
}
