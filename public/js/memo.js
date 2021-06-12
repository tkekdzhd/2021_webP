$(document).ready(function () {
    $('#addTxt').on('keyup', function () {
        $('#txt_cnt').html("(" + $(this).val().length + " / 500)");

        if ($(this).val().length > 500) {
            $(this).val($(this).val().substring(0, 500));
            $('#txt_cnt').html("(500 / 500)");
        }
    });
    const registerBtn = document.querySelector("#addBtn");
    const delBtn = document.querySelector("#delBtn");
    const addTxt = document.querySelector("#addTxt");
    const card_list = document.querySelector("#card_list");
    
    registerBtn.addEventListener("click", post);
    delBtn.addEventListener("click", del);

    function post(e) {
        e.preventDefault();
        const req = {
            body: addTxt.value
        };

        fetch("/posts/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
    }
    function del(e) {
        $.ajax({
            type: "POST",
            url: "/posts/delete",
            data: {
                id: $(this).data('id')
            },
            success: function (response) {
                alert('삭제되었습니다.');
            }
        });
    }

});