$(document).ready(() => {
    recipe()
})

function recipe() {
    $.ajax({
        type: "GET",
        url: "/recipe/read",
        data: {},
        success: function (response) {
            // console.log(response)
            let recipes = response['recipes']
            let ing = recipes['ingredient']
            let name = recipes['name']
            // let desc = recipes['desc']
            let making = recipes['making']
            let precook = recipes['precook']
            let title_html = `<img class="cook-img" src="../static/recipe-image/${name}.png" alt=""> ${name}</img>`
            let ingredient__html = `${ing}`

            for (let i = 0; i < precook.length; i++) {
                let precook = recipes['precook'][i]
                let temp_html = `<li> ${precook}. </li>`
                $('.ready_detail').append(temp_html)
            }

            for (let i = 0; i < making.length; i++) {
                let making2 = recipes['making'][i]
                let temp_html = `<li> ${making2}. </li>`
                $('.making_detail').append(temp_html)
            }

            $('.cook-name').append(title_html)
            $('.ing').append(ingredient__html)

        }
    })
}