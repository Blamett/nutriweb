function calculaImc(peso, altura) {
    var imc = 0;
    imc = peso / (altura * altura);

    return imc.toFixed(2);
}

function validaPeso(peso) {
    return peso >= 0 && peso <= 500
}

function validaAltura(altura) {
    return altura >= 0 && altura <= 3.00;
}
