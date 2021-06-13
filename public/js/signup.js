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

const registerBtn = document.querySelector("#signin_submit");
const login_form = document.querySelector("#login_form");
const username = document.querySelector("#username");
const user_id = document.querySelector("#user_id");
const password = document.querySelector("#password");

// login_form.addEventListener("submit", signup);
registerBtn.addEventListener("click", signup);

function signup(e) {
    e.preventDefault();
    const req = {
        user_id: user_id.value,
        username: username.value,
        password: password.value,
    };

    fetch("/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    // }).then((res)=>window.location.href = res)
    }).then(res=>{
        if(res.redirected == true){
            window.location.href = res.url
        }
    })
}