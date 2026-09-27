console.log("VendaPro iniciado 🚀");


const DB_KEY = "vendapro_database";

const META_SEGUIDORES = 2000;



let database = {

contas: [],
vendas: []

};





// =======================
// BANCO
// =======================


function carregarDados(){


const dados = localStorage.getItem(DB_KEY);



if(dados){

database = JSON.parse(dados);


if(!database.contas)
database.contas=[];


if(!database.vendas)
database.vendas=[];


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


cards[0].innerHTML = moeda(faturamento);


cards[1].innerHTML = database.vendas.length;


cards[2].innerHTML = moeda(faturamento);


cards[3].innerHTML = database.contas.length;


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



database.contas.forEach((c,index)=>{


let linha=document.createElement("tr");



linha.innerHTML=`


<td>${c.nome || "Sem nome"}</td>


<td>${c.seguidores || 0}</td>


<td>${progresso(c.seguidores)}</td>


<td>${moeda(c.custo)}</td>


<td>${moeda(c.precoVenda)}</td>



<td>

<span class="status">

${c.status || "Disponível"}

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


if(confirm("Excluir essa conta?")){


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



database.vendas.slice().reverse()
.forEach((v,index)=>{


let linha=document.createElement("tr");



linha.innerHTML=`


<td>${v.conta}</td>


<td>${v.cliente}</td>


<td>${moeda(v.valor)}</td>



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


if(confirm("Excluir essa venda?")){


database.vendas.splice(index,1);


salvarDados();


atualizarDashboard();


}


}








// =======================
// MODAL
// =======================


function abrirModal(html){


document
.getElementById("conteudoModal")
.innerHTML = html;



document
.getElementById("modal")
.classList.add("ativo");


}



function fecharModal(){


document
.getElementById("modal")
.classList.remove("ativo");


}



document
.getElementById("fecharModal")
.onclick = fecharModal;









// =======================
// NOVA CONTA MODAL
// =======================


function iniciarConta(){



document
.getElementById("novaConta")
.onclick = ()=>{


abrirModal(`


<h2>
Nova Conta
</h2>



<div class="form">


<input id="contaNome" placeholder="Nome da conta">


<input id="contaSeguidores" type="number" placeholder="Seguidores">


<input id="contaCusto" type="number" placeholder="Valor compra">


<input id="contaVenda" type="number" placeholder="Valor venda">


<button id="salvarConta">

Salvar conta

</button>


</div>


`);





document
.getElementById("salvarConta")
.onclick = ()=>{


database.contas.push({


nome:
document.getElementById("contaNome").value,


seguidores:
Number(document.getElementById("contaSeguidores").value),


custo:
Number(document.getElementById("contaCusto").value),


precoVenda:
Number(document.getElementById("contaVenda").value),


status:"Disponível"


});



salvarDados();


atualizarDashboard();


fecharModal();


};


};


}









// =======================
// NOVA VENDA MODAL
// =======================


function iniciarVenda(){



document
.getElementById("novaVenda")
.onclick = ()=>{


abrirModal(`


<h2>
Nova Venda
</h2>



<div class="form">


<input id="vendaConta" placeholder="Conta">


<input id="vendaCliente" placeholder="Cliente">


<input id="vendaValor" type="number" placeholder="Valor">


<button id="salvarVenda">

Salvar venda

</button>


</div>



`);





document
.getElementById("salvarVenda")
.onclick = ()=>{



database.vendas.push({


conta:
document.getElementById("vendaConta").value,


cliente:
document.getElementById("vendaCliente").value,


valor:
Number(document.getElementById("vendaValor").value)



});



salvarDados();


atualizarDashboard();


fecharModal();


};


};


}









// =======================
// INICIAR
// =======================


document.addEventListener(

"DOMContentLoaded",

()=>{


carregarDados();


atualizarDashboard();


iniciarConta();


iniciarVenda();


}

);
