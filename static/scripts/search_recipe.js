function search_recipe(name){
    console.log("recipe search");

    $.ajax({
        type: "POST",
        url: "/recommend/search2",
        data: {name_give: name},
        success: function (response) {
            }
    })
    window.location.href = '/recipe';
}