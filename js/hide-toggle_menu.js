console.log("js foi iniciado")

var iconLateral = document.getElementById("cabecalho__menu")

var barraLateral = document.getElementById("menu-lateral")

var menuicon = document.getElementById("menuicon")


iconLateral.addEventListener("click", function() {
    
    barraLateral.classList.toggle('ativo')
    menuicon.classList.toggle("fa-bars-staggered")



});   




    