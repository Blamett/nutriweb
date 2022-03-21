var botaoAdicionar = document.getElementById("buscar-pacientes");

botaoAdicionar.addEventListener("click", atualizarTabelaClientes);

function atualizarTabelaClientes() {
    $("tbody tr").remove();

    var url = "//localhost:3000/clientes/";

    $.get(url, function( pacientes ) {
        pacientes.forEach(function (paciente) {
            adicionaPacienteNaTabela(paciente);
        });
    });

}