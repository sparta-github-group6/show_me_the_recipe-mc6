$(function(){

$('.btn_menu').on('click', function(){
    $(this).toggleClass('active');
    $('.navigation').toggleClass('active');
})
})


function logout(){
    window.sessionStorage.setItem("login_check","bad")
}