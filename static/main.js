const toggleBtn = document.querySelector(".navbar__toggleBtn");
const menu = document.querySelector(".navbar__menu");

toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});


/* related to recommend page function*/

function to_recommend() {
  var link ="recommend.html"
    location.href = link;
}

$(document).ready(function () {
    listing();
});

function listing() {
    $('#recipe-box').empty();
    $.ajax({
        type: "GET",
        url: "database",
        data: {},
        success: function (response) {
            let rows = response['recipes']
            for (let i = 0; i < rows.length; i++) {
                let image = rows[i]['image']
                let title = rows[i]['title']
                let desc = rows[i]['desc']
                let time = rows[i]['time']
                let level = rows[i]['level']
                let like = rows[i]['like']

                let temp_html = `
                                <div class="recipes_all_about_1">
                                    <nav class="recipes_img"><img src="${image}"> 이미지 </img></nav>
                                    <section class="recipes_information">
                                        <p class="recipes_title"> ${title} </p>
                                        <hr>
                                        <p class="recipes_desc"> ${desc} </p>
                                        <hr>
                                        <p class="recipes_time"> 조리시간: ${time}</p>
                                        <p class="recipes_level"> 난이도: ${level} </p>
                                        <p class="recipes_like"> 좋아요: ${like}</p>
                                    </section>
                                </div>`

                $('#recipe-box').append(temp_html);
            }
        }
    })
}
