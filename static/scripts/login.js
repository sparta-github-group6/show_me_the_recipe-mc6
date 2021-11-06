
function login() {
  let user_id = $("#user").val();
  let user_pw = $("#password").val();

  $.ajax({
    type: "POST",
    url: "/login/check",
    data: { userid_give: user_id, userpw_give: user_pw },
    success: function (response) {
      if (response['user_data'] == null) {
        alert("아이디/비밀번호를 확인하세요");
      } else {
        console.log(response['user_data'], window.sessionStorage.getItem("user_data"))
        window.location.href = "/";
      }
    },
  });
}

function skipToMain() {
  let alert_text =
    "로그인하지 않는 경우 일부 기능이 제한됩니다.\n계속 진행하시겠습니까?";
  if (confirm(alert_text) == true) {
    //확인
    location.href = "/";
  } else {
    //취소
    return;
  }
}

function toRegister() {
  // console.log("회원가입 함수 실행");
  location.href = "/register";
  // window.open("/register", "/", "width=300, height=300");
}
