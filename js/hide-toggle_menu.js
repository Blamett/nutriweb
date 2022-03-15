console.log("js foi iniciado")

var iconLateralEsquerdo = document.getElementById("cabecalho__menu")
var iconLateralDireito = document.getElementById("cabecalho__menu-userArea")

var barraLateral = document.getElementById("menu-lateral")
var rightBar = document.getElementById("menu-lateralDireito")


var menuicon = document.getElementById("menuicon")


iconLateralEsquerdo.addEventListener("click", function() {
    
    barraLateral.classList.toggle('ativo')
    menuicon.classList.toggle("fa-bars-staggered")


});   

iconLateralDireito.addEventListener("click", function() {
    
    rightBar.classList.toggle('ativo')


});  




    