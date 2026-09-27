console.log("VendaPro iniciado 🚀");



const DB_KEY = "vendapro_database";



function carregarDados(){

let dados = localStorage.getItem(DB_KEY);


if(dados){

return JSON.parse(dados);

}


return {

contas:[],
vendas:[]

};


}





let database = carregarDados();





function salvarDados(){

localStorage.setItem(
DB_KEY,
JSON.stringify(database)
);

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







function atualizarDashboard(){



let faturamento = 0;



database.vendas.forEach(venda=>{


faturamento += Number(venda.valor);


});




const cards=document.querySelectorAll(".card h2");



if(cards.length >=4){


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








function renderizarVendas(){



const tabela =
document.querySelector("#listaVendas");



if(!tabela)return;



tabela.innerHTML="";




database.vendas
.slice()
.reverse()
.forEach(venda=>{



let linha=document.createElement("tr");



linha.innerHTML=`

<td>${venda.conta}</td>

<td>${venda.cliente}</td>

<td>${moeda(venda.valor)}</td>


`;



tabela.appendChild(linha);



});



}









// BOTÃO NOVA VENDA

document.addEventListener("DOMContentLoaded",()=>{


const botaoVenda = document.getElementById("novaVenda");


console.log("Botão encontrado:", botaoVenda);



if(botaoVenda){


botaoVenda.addEventListener("click",()=>{


console.log("Clique detectado");


let conta = prompt("Nome da conta:");

let cliente = prompt("Nome do cliente:");

let valor = prompt("Valor da venda:");



if(!conta || !cliente || !valor){

alert("Preencha todos os campos");

return;

}



database.vendas.push({

conta: conta,

cliente: cliente,

valor: Number(valor),

data: new Date().toLocaleDateString()

});



salvarDados();

atualizarDashboard();


alert("Venda cadastrada com sucesso 🚀");


});


}


});




if(botaoVenda){


botaoVenda.onclick=function(){



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

conta:conta,

cliente:cliente,

valor:Number(valor),

data:new Date()


});





salvarDados();


atualizarDashboard();




alert("Venda cadastrada 🚀");



}



}






atualizarDashboard();
