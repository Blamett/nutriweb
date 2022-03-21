var botaoBuscar = document.getElementById("buscar-pacientes2");
var botaoAtualizar = document.getElementById("atualizar-paciente")
var botaoRemover = document.getElementById("remover-paciente")
var mensagensNice = document.getElementById("mensagens-successAtt");
var mensagensErro = document.getElementById("mensagens-erroAtt");

//----------- BOTAO BUSCAR--------------\\

botaoBuscar.addEventListener("click", function () {
    getCustomerInfo()
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
        success: function (data) {

            document.getElementById("nomeGet").value = data.nome;
            document.getElementById("pesoGet").value = data.peso;
            document.getElementById("alturaGet").value = data.altura;
            document.getElementById("gorduraGet").value = data.gordura;
        },
        error: function () {
            mensagensErro.innerHTML = "ID não encontrado";
            document.getElementById("nomeGet").value = '';
            document.getElementById("pesoGet").value = '';
            document.getElementById("alturaGet").value = '';
            document.getElementById("gorduraGet").value = '';
        }
    });
}

//----------- BOTAO DELETAR--------------\\

botaoRemover.addEventListener("click", async function () {
    var customerNumber = document.getElementById("filtrar-tabela3").value;

    if (await deleteCustomerInfo(customerNumber)) {

        mensagensNice.innerHTML = "";
        mensagensNice.innerHTML = `Cliente Removido ID:${customerNumber}`;
        document.getElementById("nomeGet").value = '';
        document.getElementById("pesoGet").value = '';
        document.getElementById("alturaGet").value = '';
        document.getElementById("gorduraGet").value = '';
    } else {
        mensagensErro.innerHTML = "";
        mensagensErro.innerHTML = `Houve um erro ao tentar remover o Cliente ID:${customerNumber}`;
    }
});

async function deleteCustomerInfo(customerNumber) {
    return new Promise(resolve => {
        var url = "//localhost:3000/clientes/" + customerNumber;
        $.ajax({
            url: url,
            method: 'delete',
            data: {
                id: customerNumber
            },
            success: () => resolve(true),
            error: () => resolve(false)
        });
    })
}

//----------- BOTAO ATUALIZAR--------------\\

botaoAtualizar.addEventListener("click", async function () {
    let formAtt = document.querySelector("#form-adiciona-att");
    let pacienteAtt = obtemPacienteDoFormularioAtt(formAtt);
    let errosAtt = validaPaciente(pacienteAtt);
    var customerNumber = document.getElementById("filtrar-tabela3").value;
    mensagensErro.innerHTML = "";
    mensagensNice.innerHTML = "";

    if (errosAtt.length > 0) {
        exibeMensagensDeErroAtt(errosAtt);
        return;
    }

    if (await atualizarCliente(pacienteAtt))
    {
        atualizarCliente(pacienteAtt)

        mensagensNice.innerHTML = `Paciente atualizado ID:${customerNumber}`;;
        document.getElementById("nomeGet").value = '';
        document.getElementById("pesoGet").value = '';
        document.getElementById("alturaGet").value = '';
        document.getElementById("gorduraGet").value = '';
    }
    else
    {
        mensagensErro.innerHTML = `Houve um erro ao atualizar o paciente ID:${customerNumber}`;
    }
});

async function atualizarCliente(pacienteAtt) {
    return new Promise(resolve => {
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
            success: () => resolve(true),
            error: () => resolve(false)
        })
    })
} 

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