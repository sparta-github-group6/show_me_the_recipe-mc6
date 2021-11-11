$(document).ready(() => {
  recipe();
});

function recipe() {
  $.ajax({
    type: "GET",
    url: "/recipe/read",
    data: {},
    success: function (response) {
      // console.log(response)
      let recipes = response["recipes"];
      let ing = recipes["ingredient"];
      let name = recipes["name"];

      // let desc = recipes['desc']
      let making = recipes["making"];
      let precook = recipes["precook"];
      let img_html = `<img class="cook-img" src="../static/recipe-image/${name}.png" alt=""></img>`;
      let title_html = `<h3 style="font-size:100px; font-family: 'Cafe24Dangdanghae';">${name}</h3>`;
      let btn_html = `<button class="btn-main" id="btn-add-review" onclick="add_review('${name}')">리뷰 추가</button>`;
      let ingredient__html = `${ing}`;

      for (let i = 0; i < precook.length; i++) {
        let precook = recipes["precook"][i];
        let temp_html = `<li> ${precook}. </li>`;
        $(".ready_detail").append(temp_html);
      }

      for (let i = 0; i < making.length; i++) {
        let making2 = recipes["making"][i];
        let temp_html = `<li> ${making2}. </li>`;
        $(".making_detail").append(temp_html);
      }

      $("#recipe_img").append(img_html);
      $("#recipe_name").append(title_html);
      $("#ingredient").append(ingredient__html);
      $("#add-review").append(btn_html);
      review_show(name);
    },
  });
}

function review_show(name){
  $.ajax({
      type: "POST",
      url: "/review/show",
      data: {name_give:name},
      success: function (response) {
          let reviews = response['all_reviews']
          for (let i = 0; i < reviews.length; i++) {
              let comment = reviews[i]['comment']
              let user_id = reviews[i]['user_id']
              let datetime = reviews[i]['datetime']
              let review_html = `<li> ${comment} / ${user_id} / ${datetime} </li>`
              
              $('#review-list').append(review_html)
          }
      }
  })
}


function add_review(name){
  let comment = $('#new-review').val();

  $.ajax({
      type: "POST",
      url: "/review",
      data: {recipe_give:name, comment_give:comment},
      success: function (response) {
          let user_id = response['user_id']
          let review_html = `<li> ${comment} / ${user_id} / ${date} </li>`
          if (user_id == undefined) {
              alert('로그인 후 이용해주세요.')
          } else{
              $('#review-list').append(review_html)
              alert('추가 완료')
          }
      }
  })
}

function request_show(){
  $.ajax({
      type: "GET",
      url: "/request/show",
      data: {},
      success: function (response) {
          let requests = response['all_requests']
          for (let i = 0; i < requests.length; i++) {
              let uid = requests[i]['user_id']
              let request = requests[i]['request']
              let datetime = requests[i]['datetime']
              let request_html = `<li> ${uid}: ${request} / ${datetime} </li>`
              
              $('.request_list').append(request_html)
          }
      }
  })
}

function add_request(){
  let comment = $('#new-request').val();
  $.ajax({
      type: "POST",
      url: "/request",
      data: {request_give:comment},
      success: function (response) {
          let user_id = response['user_id']
          let req_html = `<li> ${user_id}: ${comment} / ${date} </li>`
          if (user_id == undefined) {
              alert('로그인 후 이용해주세요.')
          } else{
              $('.request_list').append(req_html)
              alert('추가 완료')
          }
      }
  })
}
