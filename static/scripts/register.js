const nameValidation = /^[a-z0-9_-]{2,20}$/;
const emailValidation = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
const pwValidation = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~,!,@,#,$,*,(,),=,+,_,.,|]).*$/;

function isValidName(input) {
    if (nameValidation.test(input.value.trim())) {
        showSuccess(input);
    } else {
    showError(input, "Name is more than 2 characters");
}

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repassword = document.getElementById("repassword");

function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === "") {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }   
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    checkRequired([username, email, password, repassword]);
    isValidName(username);
    isValidEmail(email);
    isValidPw(password);
    checkPasswordsMatch(password, repassword);
});
}