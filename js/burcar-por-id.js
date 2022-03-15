var botaoBuscar = document.querySelector("#buscar-pacientes2");
var botaoAtualizar = document.getElementById("atualizar-paciente")
var botaoRemover = document.getElementById("remover-paciente")
var mensagensNice = document.querySelector("#mensagens-niceAtt");
var mensagensErro = document.querySelector("#mensagens-erroAtt");


//----------- BOTAO BUSCAR--------------\\



botaoBuscar.addEventListener("click", function() {


    GetCustomerInfo()
    ProcessRequest()
    mensagensNice.innerHTML = "";
    mensagensErro.innerHTML = "";

}); 


var xmlHttp = null;

function GetCustomerInfo()
{
    var CustomerNumber = document.getElementById( "filtrar-tabela3" ).value;
    var Url = "//localhost:3000/clientes/" + CustomerNumber;

    xmlHttp = new XMLHttpRequest(); 
    xmlHttp.onreadystatechange = ProcessRequest;
    xmlHttp.open( "GET", Url, true );
    xmlHttp.send( null );
}

function ProcessRequest() 
{
    if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ) 
    {
        var info =  JSON.parse(xmlHttp.responseText)

            
        document.getElementById("nomeGet").value = info.nome;
        document.getElementById("pesoGet").value = info.peso;
        document.getElementById("alturaGet").value = info.altura;
        document.getElementById("gorduraGet").value = info.gordura;                   
    }
    else if(xmlHttp.status == 404)
    {
        document.getElementById("nomeGet").value = 'ID NÃO EXISTE';
        document.getElementById("pesoGet").value = '';
        document.getElementById("alturaGet").value = '';
        document.getElementById("gorduraGet").value = '';  
    }
}



//----------- BOTAO DELETAR--------------\\



botaoRemover.addEventListener("click", function() {
    DeleteCustomerInfo()
    var CustomerNumber = document.getElementById( "filtrar-tabela3" ).value;

    mensagensNice.innerHTML = "";
    mensagensNice.innerHTML = `Cliente Removido ID:${CustomerNumber}`;

        document.getElementById("nomeGet").value = '';
        document.getElementById("pesoGet").value = '';
        document.getElementById("alturaGet").value = '';
        document.getElementById("gorduraGet").value = '';  
}); 

function DeleteCustomerInfo()
{
    var CustomerNumber = document.getElementById( "filtrar-tabela3" ).value;
    var Url = "//localhost:3000/clientes/" + CustomerNumber;

    $.ajax({
        url : Url,
        method : 'delete',
        data : {
           id: CustomerNumber
        }
   })

}



//----------- BOTAO ATUALIZAR--------------\\



botaoAtualizar.addEventListener("click", function() {

    var formAtt = document.querySelector("#form-adiciona-att");
    var pacienteAtt = obtemPacienteDoFormularioAtt(formAtt);
    var errosAtt = validaPaciente(pacienteAtt);
    var mensagensErro = document.querySelector("#mensagens-erroAtt");
    var CustomerNumber = document.getElementById( "filtrar-tabela3" ).value;

    if (errosAtt.length > 0) {
        exibeMensagensDeErroAtt(errosAtt);

        return;
    }


    atualizarCliente(pacienteAtt)

    mensagensErro.innerHTML = "";

    mensagensNice.innerHTML = "";
    mensagensNice.innerHTML = `Cliente Atualizado ID:${CustomerNumber}`;
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

    function validaPaciente(pacienteAtt) {

        var errosAtt = [];
    
        if (pacienteAtt.nome.length == 0) {
            errosAtt.push("O nome não pode ser em branco");
        }
    
        if (pacienteAtt.gordura.length == 0) {
            errosAtt.push("A gordura não pode ser em branco");
        }
    
        if (pacienteAtt.peso.length == 0) {
            errosAtt.push("O peso não pode ser em branco");
        }
    
        if (pacienteAtt.altura.length == 0) {
            errosAtt.push("A altura não pode ser em branco");
        }
    
        if (!validaPeso(pacienteAtt.peso)) {
            errosAtt.push("Peso é inválido");
        }
    
        if (!validaAltura(pacienteAtt.altura)) {
            errosAtt.push("Altura é inválida");
        }
    
        return errosAtt;
    }
    
    function exibeMensagensDeErroAtt(errosAtt) {
        var ul = document.querySelector("#mensagens-erroAtt");
        ul.innerHTML = "";
    
        errosAtt.forEach(function(erroAtt) {
            var li = document.createElement("li");
            li.textContent = erroAtt;
            ul.appendChild(li);
        });
    }

    function atualizarCliente(pacienteAtt){

        var CustomerNumber = document.getElementById( "filtrar-tabela3" ).value;
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
    
            dataType: "json"
          });

    }
