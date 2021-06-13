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
        var txtval = $("#addTxt").val();
        e.preventDefault();
        const req = {
            body: addTxt.value
        };
        if(txtval.length == 0){
            alert('내용을 입력해주세요.');
        }
        else{
            $.ajax({
                type: "POST",
                url: "/posts/store",
                data: {
                    body: addTxt.value
                },
                success: function (response) {
                    console.log(response);
                    window.location.href = response;
                }
            });
        }
    }
    function del(e) {
        e.preventDefault();
        var id=$('input[name="id_check"]:checked').val()
        if(id==null){
            alert('삭제할 메모를 선택해주세요.');
        }
        else{
            $.ajax({
                type: "POST",
                url: "/posts/delete",
                data: {
                    id: id
                },
                success: function (response) {
                    alert('삭제되었습니다.');
                    window.location.href = response;
                }
            });
        }
    }

});