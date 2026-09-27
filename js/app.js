console.log("VendaPro iniciado 🚀");


const DB_KEY = "vendapro_database";

const META_SEGUIDORES = 2000;



let database = {

contas: [],
vendas: []

};





// =======================
// BANCO DE DADOS
// =======================


function carregarDados(){


const dados = localStorage.getItem(DB_KEY);



if(dados){


database = JSON.parse(dados);



if(!database.contas){
database.contas=[];
}


if(!database.vendas){
database.vendas=[];
}



}


salvarDados();


}





function salvarDados(){


localStorage.setItem(
DB_KEY,
JSON.stringify(database)
);


}








// =======================
// UTILIDADES
// =======================


function moeda(valor){


return Number(valor || 0)
.toLocaleString(
"pt-BR",
{
style:"currency",
currency:"BRL"
}
);


}







function progresso(valor){


let porcentagem = Math.min(

100,

Math.round(
(Number(valor || 0) / META_SEGUIDORES) * 100
)

);



return `


<div class="progresso-box">


<div class="barra">

<div style="width:${porcentagem}%"></div>

</div>


<span class="porcentagem">

${porcentagem}%

</span>


</div>


`;

}









// =======================
// DASHBOARD
// =======================


function atualizarDashboard(){



let faturamento = 0;



database.vendas.forEach(v=>{


faturamento += Number(v.valor || 0);


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



renderizarContas();

renderizarVendas();


}








// =======================
// CONTAS
// =======================


function renderizarContas(){


const tabela =
document.getElementById("listaContas");



if(!tabela)return;



tabela.innerHTML="";



database.contas.forEach((conta,index)=>{



if(!conta.nome){

conta.nome="Sem nome";

}



let linha =
document.createElement("tr");



linha.innerHTML = `


<td>${conta.nome}</td>


<td>

${conta.seguidores || 0}

</td>


<td>

${progresso(conta.seguidores)}

</td>


<td>

${moeda(conta.custo)}

</td>


<td>

${moeda(conta.precoVenda)}

</td>



<td>

<span class="status">

${conta.status || "Disponível"}

</span>

</td>



<td>


<button 
class="btn-delete"
onclick="removerConta(${index})">

Excluir

</button>


</td>


`;



tabela.appendChild(linha);


});


}





function removerConta(index){



if(confirm("Deseja excluir esta conta?")){


database.contas.splice(index,1);


salvarDados();


atualizarDashboard();


}



}









// =======================
// VENDAS
// =======================


function renderizarVendas(){



const tabela =
document.getElementById("listaVendas");



if(!tabela)return;



tabela.innerHTML="";



database.vendas
.slice()
.reverse()
.forEach((venda,index)=>{



let linha =
document.createElement("tr");



linha.innerHTML=`


<td>

${venda.conta || "-"}

</td>


<td>

${venda.cliente || "-"}

</td>


<td>

${moeda(venda.valor)}

</td>



<td>


<button

class="btn-delete"

onclick="removerVenda(${index})">


Excluir


</button>


</td>



`;



tabela.appendChild(linha);


});


}





function removerVenda(index){



if(confirm("Deseja excluir esta venda?")){


database.vendas.splice(index,1);


salvarDados();


atualizarDashboard();


}


}









// =======================
// NOVA CONTA
// =======================


function iniciarConta(){



const botao =
document.getElementById("novaConta");



if(!botao)return;




botao.onclick=function(){



let nome =
prompt("Nome da conta:");



let seguidores =
prompt("Seguidores:");



let custo =
prompt("Valor de compra:");



let precoVenda =
prompt("Valor de venda:");




if(!nome)return;



database.contas.push({


nome:nome,


seguidores:Number(seguidores || 0),


custo:Number(custo || 0),


precoVenda:Number(precoVenda || 0),


status:"Disponível"


});




salvarDados();


atualizarDashboard();



alert("Conta criada 🚀");



};



}









// =======================
// NOVA VENDA
// =======================


function iniciarVenda(){



const botao =
document.getElementById("novaVenda");



if(!botao)return;




botao.onclick=function(){



let conta =
prompt("Conta:");



let cliente =
prompt("Cliente:");



let valor =
prompt("Valor:");





if(!conta || !valor)return;



database.vendas.push({


conta,

cliente,

valor:Number(valor)



});




salvarDados();


atualizarDashboard();



alert("Venda registrada 🚀");



};



}










// =======================
// INICIAR SISTEMA
// =======================


document.addEventListener(
"DOMContentLoaded",
()=>{


carregarDados();


atualizarDashboard();


iniciarConta();


iniciarVenda();


});
