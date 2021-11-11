// 재료 담을 리스트 생성
let ing_list = [];
let count = 1;

// 선택 버튼 누르면 동작하는 함수
function add_ingredient() {
  let name = $("#ingredient").val();
  if (name === "") {
    alert("재료를 입력해주세요.");
  } else {
    let item = document.getElementById("ingredient").value;
    console.log(item);
    ing_list.push(item);

    let selected_title = $("#selected_title");
    selected_title.show();

    let selected_box = $("#selected");
    selected_box.show();

    let item_list = $("#selected-item-list");

    // item_list.append("<li class='sel_item'>" + item + "</li>");
    let temp_html = `<li id="sel_item${count}">${item}<button class="btn-main del_item" onclick="delete_item(${count})"><i class="fas fa-times del_item"></i></button></li>`;
    item_list.append(temp_html);

    $("#ingredient").val("");
    count++;
  }
}

function delete_list() {
  $("#selected-item-list").empty();
  ing_list = [];
}

function delete_item(count) {
  let del = "#sel_item" + String(count);
  let del2 = $(del).text();
  $(del).remove();
  const idx = ing_list.indexOf(del2);
  ing_list.splice(idx, 1);
}

function to_recommend() {
  if (ing_list.length < 1) {
    alert("재료 목록이 비었습니다.");
  } else {
    $.ajax({
      type: "POST",
      url: "/recommend/search",
      data: { ing_list },
      traditional: true,
      success: function (response) {},
    });
    location.href = "/recommend";
  }
}
