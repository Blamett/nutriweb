var botaoBuscar = document.querySelector("#buscar-pacientes2");
var botaoAtualizar = document.getElementById("atualizar-paciente")
var botaoRemover = document.getElementById("remover-paciente")
var mensagensNice = document.querySelector("#mensagens-niceAtt");
var mensagensErro = document.querySelector("#mensagens-erroAtt");

//----------- BOTAO BUSCAR--------------\\


botaoBuscar.addEventListener("click", function () {

    getCustomerInfo()
    // processRequest()
    mensagensNice.innerHTML = "";
    mensagensErro.innerHTML = "";

});

var xmlHttp = null;

function getCustomerInfo() {
    var customerNumber = document.getElementById("filtrar-tabela3").value;
    var url = "//localhost:3000/clientes/" + customerNumber;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = processRequest;
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

function processRequest() {
    if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200) {
        var info = JSON.parse(xmlHttp.responseText)


        document.getElementById("nomeGet").value = info.nome;
        document.getElementById("pesoGet").value = info.peso;
        document.getElementById("alturaGet").value = info.altura;
        document.getElementById("gorduraGet").value = info.gordura;
    }
    else if (xmlHttp.status == 404) {
        mensagensErro.innerHTML = "ID não encontrado";
        document.getElementById("nomeGet").value = '';
        document.getElementById("pesoGet").value = '';
        document.getElementById("alturaGet").value = '';
        document.getElementById("gorduraGet").value = '';
    }
}


//----------- BOTAO DELETAR--------------\\


botaoRemover.addEventListener("click", function () {
    deleteCustomerInfo()
    var customerNumber = document.getElementById("filtrar-tabela3").value;

    mensagensNice.innerHTML = "";
    mensagensNice.innerHTML = `Cliente Removido ID:${customerNumber}`;

    document.getElementById("nomeGet").value = '';
    document.getElementById("pesoGet").value = '';
    document.getElementById("alturaGet").value = '';
    document.getElementById("gorduraGet").value = '';
});

function deleteCustomerInfo() {
    var customerNumber = document.getElementById("filtrar-tabela3").value;
    var url = "//localhost:3000/clientes/" + customerNumber;

    $.ajax({
        url: url,
        method: 'delete',
        data: {
            id: customerNumber
        }
    });
}

//----------- BOTAO ATUALIZAR--------------\\

botaoAtualizar.addEventListener("click", function () {

    var formAtt = document.querySelector("#form-adiciona-att");
    var pacienteAtt = obtemPacienteDoFormularioAtt(formAtt);
    var errosAtt = validaPaciente(pacienteAtt);
    var mensagensErro = document.querySelector("#mensagens-erroAtt");
    var customerNumber = document.getElementById("filtrar-tabela3").value;

    if (errosAtt.length > 0) {
        exibeMensagensDeErroAtt(errosAtt);
        return;
    }

    atualizarCliente(pacienteAtt)

    mensagensErro.innerHTML = "";

    mensagensNice.innerHTML = "";
    mensagensNice.innerHTML = `Cliente Atualizado ID:${customerNumber}`;
    document.getElementById("nomeGet").value = '';
    document.getElementById("pesoGet").value = '';
    document.getElementById("alturaGet").value = '';
    document.getElementById("gorduraGet").value = '';
});

function obtemPacienteDoFormularioAtt(formAtt) {

    var pacienteAtt = {
        nome: formAtt.nome.value,
        peso: formAtt.peso.value,
        altura: formAtt.altura.value,
        gordura: formAtt.gordura.value,
        imc: calculaImc(formAtt.peso.value, formAtt.altura.value)
    }

    return pacienteAtt;
}

function exibeMensagensDeErroAtt(errosAtt) {
    var ul = document.querySelector("#mensagens-erroAtt");
    ul.innerHTML = "";

    errosAtt.forEach(function (erroAtt) {
        var li = document.createElement("li");
        li.textContent = erroAtt;
        ul.appendChild(li);
    });
}

function atualizarCliente(pacienteAtt) {

    var CustomerNumber = document.getElementById("filtrar-tabela3").value;
    var Url = "//localhost:3000/clientes/" + CustomerNumber;

    $.ajax({

        type: "PUT",
        url: Url,
        data: {
            "nome": `${pacienteAtt.nome}`,
            "peso": `${pacienteAtt.peso}`,
            "altura": `${pacienteAtt.altura}`,
            "gordura": `${pacienteAtt.gordura}`,
            "imc": `${pacienteAtt.imc}`
        },

        dataType: "json",

        // complete: (...args) => console.log(args),

    });

}
