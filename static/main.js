const toggleBtn = document.querySelector(".navbar__toggleBtn");
const menu = document.querySelector(".navbar__menu");

toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});


/* related to recommend page function*/

function to_recommend() {
    var ingredient = $('#ingredient').val();
    $.ajax({
        type: "POST",
        url: "/recommend/search",
        data: {ing_give: ingredient},
        success: function (response) {
            console.log(response)
        }
    })
    var link = "/recommend"
    location.href = link;
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




//
// $(document).ready(function () {
//     listing();
// });
//
// function listing() {
//     $('#recipe-box').empty();
//     $.ajax({
//         type: "GET",
//         url: "database",
//         data: {},
//         success: function (response) {
//             let rows = response['recipes']
//             for (let i = 0; i < rows.length; i++) {
//                 let image = rows[i]['image']
//                 let title = rows[i]['title']
//                 let desc = rows[i]['desc']
//                 let like = rows[i]['like']
//
//                 let temp_html = `
//                                 <div class="recipes_all_about_1">
//                                     <nav class="recipes_img"><img src="${image}"> 이미지 </img></nav>
//                                     <section class="recipes_information">
//                                         <p class="recipes_title"> ${title} </p>
//                                         <hr>
//                                         <p class="recipes_desc"> ${desc} </p>
//                                         <hr>
//                                         <p class="recipes_like"> 좋아요: ${like}</p>
//                                     </section>
//                                 </div>`
//
//                 $('#recipe-box').append(temp_html);
//             }
//         }
//     })
// }
