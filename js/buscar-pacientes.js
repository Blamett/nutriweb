var botaoAdicionar = document.querySelector("#buscar-pacientes");

function atualizarTabelaClientes() {
    $("tbody tr").remove();

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "//localhost:3000/clientes");

    xhr.addEventListener("load", function () {
        var resposta = xhr.responseText;

        var pacientes = JSON.parse(resposta);

        pacientes.forEach(function (paciente) {
            adicionaPacienteNaTabela(paciente);
        });
    });

    xhr.send();
}

botaoAdicionar.addEventListener("click", atualizarTabelaClientes);