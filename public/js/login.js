// Scroll Animation (sa, 스크롤 애니메이션)
const saTriggerMargin = 300;
const saElementList = document.querySelectorAll('.sa');

const saFunc = function () {
    for (const element of saElementList) {
        if (!element.classList.contains('show')) {
            if (window.innerHeight > element.getBoundingClientRect().top + saTriggerMargin) {
                element.classList.add('show');
            }
        }
    }
}

window.addEventListener('load', saFunc);
window.addEventListener('scroll', saFunc);


registerBtn = document.querySelector("#signin_submit");
login_form = document.querySelector("#login_form");
user_id = document.querySelector("#user_id");
password = document.querySelector("#password");

// login_form.addEventListener("submit", login);

// function login() {
//     const req = {
//         user_id: user_id.value,
//         password: password.value,
//     };
//     fetch("/users/login", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(req),
//     })
// }