$(function(){

    $("#navigation").load("templates/nav.html");

    $('.btn_menu').on('click', function(){
    $(this).toggleClass('active');
    $('.navigation').toggleClass('active');
    })

})

