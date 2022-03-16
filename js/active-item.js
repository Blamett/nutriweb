var usersdiv = document.getElementById("users_tab")
var adduserdiv = document.getElementById("adduser_tab")
var calendardiv = document.getElementById("calendar_tab")


$(".menu-lateral a").on("click", function(e) {
    
    $(".menu-lateral a.menu-lateral__link--ativo").removeClass("menu-lateral__link--ativo");
    
    $(this).addClass("menu-lateral__link--ativo");

    
    $(".tab.ativo").removeClass("ativo")

    //---------------------------------------

    $("#mainText").text($(this).data("nome"));

    $("#" + $(this).data("id")).addClass("ativo")
    
    if($(".menu-lateral__link--refrash").hasClass("menu-lateral__link--ativo")){
            location.reload(true)
    }

    if($("#users_tab").hasClass("ativo")){
        $("tbody tr").remove(); 

        var xhr = new XMLHttpRequest();

        xhr.open("GET", "//localhost:3000/clientes");
    
        xhr.addEventListener("load", function() {
            var resposta = xhr.responseText;
    
            var pacientes = JSON.parse(resposta);
    
            pacientes.forEach(function(paciente) {
                adicionaPacienteNaTabela(paciente);
            });
        });
    
        xhr.send();
    }

});

