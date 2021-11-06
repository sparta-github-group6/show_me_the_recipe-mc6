
//init
let id ="";
let email = "";
//입력한 내용 유효성 검사사
function form_check() {
  var uid = document.getElementById("username");
  var eid = document.getElementById("email_id");
  var pwd = document.getElementById("password");
  var rpw = document.getElementById("re_password");

  if (uid.value == "") {
    alert("아이디를 입력하세요!");
    uid.focus();
    return false;
  }

  if (eid.value == "") {
    alert("이메일을 입력하세요!");
    eid.focus();
    return false;
  }

  if (pwd.value == "") {
    alert("비밀번호를 입력하세요!");
    pwd.focus();
    return false;
  }

  if (rpw.value !== pwd.value) {
    alert("비밀번호가 일치하지 않습니다..");
    rpw.focus();
    return false;
  }

  console.log(uid.value, eid.value, pwd.value);

  makeEmail();

  // register();
}

//DB에 동일한 id 있는지 확인

function id_check() {

  $('#username').change(function () {
    $('#id_check_sucess').hide();
    $('.id_check_button').show();
    $('#username').attr("check_result", "fail");
  })

  id =  $("#username").val();
  if(id.length>1){
    $.ajax({
      type: "POST",
      url: "/register/id_check",
      data: {userid_give: id},
      success: function (response) {
        console.log(response);
        if(response['result'] == "fail"){
          alert("이미 존재하는 아이디입니다.");
          $('#username').focus();
          return;
        }else{
          alert("사용 가능한 아이디입니다.");
          $('.username_input').attr("check_result", "success");
          $('#id_check_sucess').show();
          $('#id_check_button').hide();
        }
      }
    });
  }else{
    alert("아이디를 입력하세요!");
  }



  
  
}

//이메일 입력
function change_email() {
  var email_add = document.getElementById("email_add");
  var email_sel = document.getElementById("email_sel");

  //지금 골라진 옵션의 순서와 값 구하기
  var idx = email_sel.options.selectedIndex;
  var val = email_sel.options[idx].value;

  email_add.value = val;
}



function makeEmail() {
  var email_id = $("#email_id").val();
  var email_add = $("#email_add").val();
  email = email_id + "@" + email_add;

  console.log(email);

  register();
}

function register() {
  let user_id = $("#username").val();
  let user_pw = $("#password").val();
  let user_mail = email;

  console.log(user_id, user_pw, user_mail);

  $.ajax({
    type: "POST",
    url: "/register/add",
    data: {
      userid_give: user_id,
      userpw_give: user_pw,
      usermail_give: user_mail,
    },
    success: function (response) {
      // console.log(response);
      // print(response);
      // alert(response);
      window.location.href = "/login";
    },
  });
}
