$(function () {
  $(".btn_menu").on("click", function () {
    $(this).toggleClass("active");
    $(".nav").toggleClass("active");
  });
});


$(".user_menu").click(function() {
  if($(this).hasClass("active")){
    $(this).children().css("display", "none");
    $(this).removeClass();
  }else{
    $(this).addClass("active");
    $(this).children().css("display", "block");
  }
})