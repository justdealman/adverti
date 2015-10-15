jQuery( document ).ready(function ($) {
    $(".search .input-text").focus(function () {
        var value = $(this).val();
        if (value == "Поиск по сайту") {
            $(this).val("");
        }
    });
    $(".cat-nav .more").click(function () {
        $(".cat-nav .more").hide().parent().find('ul').show();
        return false;
    });
});


var test_for_printcss = false;

function printcss() {
    if(test_for_printcss == false){
    test_for_printcss = true;
    } else {
    test_for_printcss = false;
    }
    var cssname = "/skin/frontend/adverti/default/css/style_print.css";

    var obj = document.getElementById("mycss");
    if (obj != null) obj.href = cssname;
    if(obj == null){
       var test = document.getElementById("removecss");
       test.href = cssname;
    } else {
        $("#removecss").remove();
    }
    obj = document.getElementById("removeprint1");

    if (obj != null) obj.innerHTML = '';

    obj = document.getElementById("removeprint2");
    if (obj != null) obj.innerHTML = '';

    obj = document.getElementById("removeprint3");
    if (obj != null) obj.innerHTML = '';

    obj = document.getElementById("removeprint4");
    if (obj != null) obj.innerHTML = '';

    obj = document.getElementById("removeprint5");
    if (obj != null) obj.innerHTML = '';

}

window.onhashchange = function(){
    if(test_for_printcss==true){
        window.location = window.location;
    }
  }
