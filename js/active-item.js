var usersdiv = document.getElementById("users_tab")
var adduserdiv = document.getElementById("adduser_tab")
var calendardiv = document.getElementById("calendar_tab")

$(".menu-lateral a").on("click", function (e) {

    $(".menu-lateral a.menu-lateral__link--ativo").removeClass("menu-lateral__link--ativo");

    $(this).addClass("menu-lateral__link--ativo");

    $(".tab.ativo").removeClass("ativo")

    //---------------------------------------

    $("#mainText").text($(this).data("nome"));

    const tabId = $(this).data("id");

    $("#" + tabId).addClass("ativo")

    if (tabId === "users_tab") {
        atualizarTabelaClientes();
    }
});

