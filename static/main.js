const toggleBtn = document.querySelector(".navbar__toggleBtn");
const menu = document.querySelector(".navbar__menu");

toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
});

/* 추천 검색 페이지 이동하고 싶은데 말이죠... 파라미터를 넣어야 하나요... */
function onclick() {
    let link = "recommend.html";
    location.href = link;
}

$(document).ready(function () {
    listing();
});

function listing() {
    $('#cards-box').empty();
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
                                        <div class="row g-0" style="width: 100%; margin-top: 50px; border: 3px solid palegoldenrod; background-color: palegoldenrod">
                                           <div class="col-md-4">
                                             <img src="${image}" alt="레시피1" class="recipes-img">
                                           </div>
                                           <div class="col-md-8">
                                            <div class="recipes-desc-all">
                                              <h5 class="recipes-title">${title}</h5>
                                              <hr>
                                              <p class="recipes-desc">${desc}</p>
                                              <hr>
                                              <p class="recipes-time"><small class="text-muted">조리시간: ${time}</small></p>
                                              <p class="recipes-level"><small class="text-muted">요리난이도: ${level}</small></p>
                                              <p class="recipes-like"><small class="text-muted">좋아요: ${like}</small></p>
                                            </div>
                                           </div>`

                $('#cards-box').append(temp_html);
            }
        }
    })
}
