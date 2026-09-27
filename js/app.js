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


let faturamento=0;



database.vendas.forEach(v=>{


faturamento += Number(v.valor || 0);


});



let cards=document.querySelectorAll(".card h2");



if(cards.length>=4){


cards[0].innerHTML=moeda(faturamento);


cards[1].innerHTML=database.vendas.length;


cards[2].innerHTML=moeda(faturamento);


cards[3].innerHTML=database.contas.length;


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



if(!c.nome)
c.nome="Sem nome";



let linha=document.createElement("tr");



linha.innerHTML=`


<td>${c.nome}</td>


<td>${c.seguidores || 0}</td>


<td>

${progresso(c.seguidores)}

</td>


<td>${moeda(c.custo)}</td>


<td>${moeda(c.precoVenda)}</td>


<td>

<span class="status">

${c.status || "Disponível"}

</span>

</td>



<td>


<div class="acoes">


<button

class="btn-edit"

onclick="editarConta(${index})">

Editar

</button>



<button

class="btn-followers"

onclick="atualizarSeguidores(${index})">

Seguidores

</button>



<button

class="btn-delete"

onclick="removerConta(${index})">

Excluir

</button>


</div>


</td>


`;



tabela.appendChild(linha);


});


}








function editarConta(index){



const conta = database.contas[index];



abrirModal(`


<h2>
Editar conta
</h2>



<div class="form">


<input id="editNome" value="${conta.nome}">


<input id="editSeg" type="number" value="${conta.seguidores}">


<input id="editCompra" type="number" value="${conta.custo}">


<input id="editVenda" type="number" value="${conta.precoVenda}">


<button id="salvarEdicao">

Salvar

</button>


</div>



`);




document
.getElementById("salvarEdicao")
.onclick=()=>{


conta.nome =
document.getElementById("editNome").value;



conta.seguidores =
Number(document.getElementById("editSeg").value);



conta.custo =
Number(document.getElementById("editCompra").value);



conta.precoVenda =
Number(document.getElementById("editVenda").value);



salvarDados();

atualizarDashboard();

fecharModal();


};


}








function atualizarSeguidores(index){



const conta =
database.contas[index];



let novo =
prompt(
"Novo número de seguidores:",
conta.seguidores
);



if(!novo)return;



if(!conta.historico)

conta.historico=[];



conta.historico.push({

data:new Date().toLocaleDateString(),

anterior:conta.seguidores,

novo:Number(novo),

crescimento:
Number(novo)-conta.seguidores

});



conta.seguidores =
Number(novo);



salvarDados();


atualizarDashboard();


}







function removerConta(index){



if(confirm("Excluir esta conta?")){


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


if(confirm("Excluir venda?")){


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
.innerHTML=html;


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
.onclick=fecharModal;









// =======================
// NOVA CONTA
// =======================


function iniciarConta(){


document
.getElementById("novaConta")
.onclick=()=>{


abrirModal(`

<h2>
Nova Conta
</h2>


<div class="form">


<input id="contaNome" placeholder="Nome">


<input id="contaSeguidores" type="number" placeholder="Seguidores">


<input id="contaCusto" type="number" placeholder="Compra">


<input id="contaVenda" type="number" placeholder="Venda">


<button id="salvarConta">

Salvar

</button>


</div>

`);



document
.getElementById("salvarConta")
.onclick=()=>{


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
// NOVA VENDA
// =======================


function iniciarVenda(){


document
.getElementById("novaVenda")
.onclick=()=>{


abrirModal(`


<h2>
Nova Venda
</h2>


<div class="form">


<input id="vendaConta" placeholder="Conta">


<input id="vendaCliente" placeholder="Cliente">


<input id="vendaValor" type="number" placeholder="Valor">


<button id="salvarVenda">

Salvar

</button>


</div>


`);



document
.getElementById("salvarVenda")
.onclick=()=>{


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









document.addEventListener(

"DOMContentLoaded",

()=>{


carregarDados();


atualizarDashboard();


iniciarConta();


iniciarVenda();


}

);
