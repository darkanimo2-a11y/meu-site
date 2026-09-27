console.log("VendaPro iniciado 🚀");


const DB_KEY = "vendapro_database";



let database = {

    contas: [],
    vendas: []

};





// ==========================
// CARREGAR BANCO
// ==========================


function carregarDados(){


    const dados = localStorage.getItem(DB_KEY);



    if(dados){

        database = JSON.parse(dados);

        console.log("Banco carregado:", database);

    }
    else{

        salvarDados();

        console.log("Novo banco criado");

    }


}







// ==========================
// SALVAR BANCO
// ==========================


function salvarDados(){


    localStorage.setItem(
        DB_KEY,
        JSON.stringify(database)
    );


    console.log("Dados salvos");

}








function moeda(valor){


return Number(valor).toLocaleString(
"pt-BR",
{
style:"currency",
currency:"BRL"
}
);


}








// ==========================
// ATUALIZAR DASHBOARD
// ==========================


function atualizarDashboard(){



let faturamento = 0;



database.vendas.forEach(venda=>{


faturamento += Number(venda.valor);


});




const cards =
document.querySelectorAll(".card h2");



if(cards.length >= 4){


cards[0].innerHTML =
moeda(faturamento);



cards[1].innerHTML =
database.vendas.length;



cards[2].innerHTML =
moeda(faturamento);



cards[3].innerHTML =
database.contas.length;


}




renderizarVendas();


}








// ==========================
// MOSTRAR VENDAS
// ==========================


function renderizarVendas(){



const tabela =
document.querySelector("#listaVendas");



if(!tabela)return;



tabela.innerHTML="";



database.vendas
.slice()
.reverse()
.forEach(venda=>{


let linha =
document.createElement("tr");



linha.innerHTML = `

<td>${venda.conta}</td>

<td>${venda.cliente}</td>

<td>${moeda(venda.valor)}</td>

`;



tabela.appendChild(linha);



});


}










// ==========================
// NOVA VENDA
// ==========================


function iniciarVenda(){



const botaoVenda =
document.getElementById("novaVenda");



if(!botaoVenda)return;



botaoVenda.addEventListener(
"click",
()=>{


let conta =
prompt("Nome da conta:");



let cliente =
prompt("Nome do cliente:");



let valor =
prompt("Valor da venda:");





if(!conta || !cliente || !valor){

alert("Preencha todos os campos");

return;

}




database.vendas.push({

conta,

cliente,

valor:Number(valor),

data:new Date().toLocaleDateString()

});





salvarDados();


atualizarDashboard();



alert("Venda cadastrada 🚀");


});


}










// ==========================
// INICIAR SISTEMA
// ==========================


document.addEventListener(
"DOMContentLoaded",
()=>{


carregarDados();


atualizarDashboard();


iniciarVenda();



});
