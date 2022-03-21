var botaoBuscar = document.getElementById("buscar-pacientes2");
var botaoAtualizar = document.getElementById("atualizar-paciente")
var botaoRemover = document.getElementById("remover-paciente")
var mensagensNice = document.getElementById("mensagens-successAtt");
var mensagensErro = document.getElementById("mensagens-erroAtt");

//----------- BOTAO BUSCAR--------------\\

botaoBuscar.addEventListener("click", function () {
    getCustomerInfo()
    // processRequest()
    mensagensNice.innerHTML = "";
    mensagensErro.innerHTML = "";
});

function getCustomerInfo() {
    var customerNumber = document.getElementById("filtrar-tabela3").value;
    var url = "//localhost:3000/clientes/" + customerNumber;

    $.ajax({
        type: "GET",   
        url: url,   
        async: true,
        success : function(data) {

            document.getElementById("nomeGet").value = data.nome;
            document.getElementById("pesoGet").value = data.peso;
            document.getElementById("alturaGet").value = data.altura;
            document.getElementById("gorduraGet").value = data.gordura;
        },
        error:function() {
            mensagensErro.innerHTML = "ID não encontrado";
            document.getElementById("nomeGet").value = '';
            document.getElementById("pesoGet").value = '';
            document.getElementById("alturaGet").value = '';
            document.getElementById("gorduraGet").value = '';
        }

    });
}

//----------- BOTAO DELETAR--------------\\

botaoRemover.addEventListener("click", function () {
    var customerNumber = document.getElementById("filtrar-tabela3").value;

    deleteCustomerInfo()

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

    var customerNumber = document.getElementById("filtrar-tabela3").value;
    var url = "//localhost:3000/clientes/" + customerNumber;

    $.ajax({

        type: "PUT",
        url: url,
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
