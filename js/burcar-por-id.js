var botaoBuscar = document.querySelector("#buscar-pacientes2");
var botaoAtualizar = document.getElementById("atualizar-paciente")
var botaoRemover = document.getElementById("remover-paciente")



//----------- BOTAO BUSCAR--------------\\



botaoBuscar.addEventListener("click", function() {

    GetCustomerInfo()
    ProcessRequest()

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



//----------- BOTAO ATUALIZAR--------------\\



botaoRemover.addEventListener("click", function() {

});

function DeleteCustomerInfo()
{
    var CustomerNumber = document.getElementById( "filtrar-tabela3" ).value;
    var Url = "//localhost:3000/clientes/" + CustomerNumber;


}



//----------- BOTAO ATUALIZAR--------------\\



botaoAtualizar.addEventListener("click", function() {



    document.getElementById("nomeGet").value = '';
    document.getElementById("pesoGet").value = '';
    document.getElementById("alturaGet").value = '';
    document.getElementById("gorduraGet").value = '';  
}); 
