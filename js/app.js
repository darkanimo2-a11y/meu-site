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

(Number(valor || 0)/META_SEGUIDORES)*100

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



const cards=document.querySelectorAll(".card h2");



if(cards.length>=4){


cards[0].innerHTML=moeda(faturamento);


cards[1].innerHTML=database.vendas.length;


cards[2].innerHTML=moeda(faturamento);


cards[3].innerHTML=database.contas.length;


}



renderizarContas();

renderizarVendas();

gerarGrafico();


}









// =======================
// CONTAS
// =======================


function renderizarContas(){


const tabela=document.getElementById("listaContas");


if(!tabela)return;



tabela.innerHTML="";



database.contas.forEach((c,index)=>{



let status = c.status || "Disponível";



let classeStatus =
status === "Vendida"
?
"status-vendida"
:
"status";



linha=document.createElement("tr");



linha.innerHTML=`


<td>${c.nome}</td>


<td>${c.seguidores}</td>


<td>${progresso(c.seguidores)}</td>


<td>${moeda(c.custo)}</td>


<td>${moeda(c.precoVenda)}</td>


<td>

<span class="${classeStatus}">

${status}

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



${status !== "Vendida"

?

`

<button

class="btn-sell"

onclick="venderConta(${index})">

Vender

</button>

`

:

""

}



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









// =======================
// VENDER CONTA
// =======================


function venderConta(index){


const conta = database.contas[index];



abrirModal(`


<h2>

Vender ${conta.nome}

</h2>



<div class="form">


<input id="clienteVenda" placeholder="Cliente">


<input id="valorVenda" type="number" value="${conta.precoVenda}">


<button id="confirmarVenda">

Confirmar venda

</button>


</div>


`);





document
.getElementById("confirmarVenda")
.onclick=()=>{


database.vendas.push({


conta:conta.nome,


cliente:
document.getElementById("clienteVenda").value,


valor:
Number(
document.getElementById("valorVenda").value
),


data:new Date().toLocaleDateString()


});



conta.status="Vendida";



salvarDados();


atualizarDashboard();


fecharModal();


};



}









// =======================
// VENDAS
// =======================


function renderizarVendas(){


const tabela=document.getElementById("listaVendas");


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
// GRÁFICO
// =======================


function gerarGrafico(){


const grafico =
document.getElementById("graficoVendas");



if(!grafico)return;



grafico.innerHTML="";



let meses={};



database.vendas.forEach(v=>{


let data =
v.data || "Atual";



if(!meses[data])
meses[data]=0;



meses[data]+=Number(v.valor);


});



Object.keys(meses)
.forEach(m=>{


let valor=meses[m];



let altura =
Math.min(
250,
valor/2
);



grafico.innerHTML += `


<div class="grafico-item">


<div class="grafico-valor">

${moeda(valor)}

</div>


<div

class="grafico-barra"

style="height:${altura}px">

</div>


<div class="grafico-mes">

${m}

</div>


</div>


`;


});



}








// =======================
// MODAL
// =======================


function abrirModal(html){


document.getElementById("conteudoModal").innerHTML=html;


document.getElementById("modal").classList.add("ativo");


}



function fecharModal(){


document.getElementById("modal").classList.remove("ativo");


}



document
.getElementById("fecharModal")
.onclick=fecharModal;






// =======================
// NOVA CONTA
// =======================


function iniciarConta(){


const botoes = [

"novaConta",

"novaConta2"

];



botoes.forEach(id=>{


const botao =
document.getElementById(id);



if(botao){


botao.onclick = ()=>{


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


});


}


// =======================
// NOVA VENDA
// =======================


function iniciarVenda(){


document.getElementById("novaVenda")
.onclick=()=>{


let disponiveis =
database.contas.filter(
c=>c.status !== "Vendida"
);



let opcoes =
disponiveis.map((c,i)=>

`<option value="${i}">
${c.nome}
</option>`

).join("");



abrirModal(`


<h2>

Nova Venda

</h2>


<div class="form">


<select id="contaVenda">

${opcoes}

</select>


<input id="clienteVenda" placeholder="Cliente">


<input id="valorVenda" type="number" placeholder="Valor">


<button id="salvarVenda">

Salvar

</button>


</div>


`);




document.getElementById("salvarVenda")
.onclick=()=>{


let conta =
disponiveis[
document.getElementById("contaVenda").value
];



database.vendas.push({

conta:conta.nome,

cliente:
document.getElementById("clienteVenda").value,

valor:
Number(
document.getElementById("valorVenda").value
),

data:new Date().toLocaleDateString()

});



conta.status="Vendida";


salvarDados();


atualizarDashboard();


fecharModal();


};


};


}







// =======================
// NAVEGAÇÃO SIDEBAR
// =======================


function iniciarNavegacao(){



const links = document.querySelectorAll(".menu-link");


const paginas = document.querySelectorAll(".pagina");




links.forEach(link=>{


link.addEventListener("click",()=>{



const paginaId =
link.dataset.page;



// esconder páginas

paginas.forEach(p=>{

p.classList.remove("ativa");

});




// mostrar página escolhida

const pagina =
document.getElementById(paginaId);



if(pagina){

pagina.classList.add("ativa");

}




// mudar menu ativo

links.forEach(l=>{

l.classList.remove("active");

});


link.classList.add("active");



});


});


}

// =======================
// INICIALIZAÇÃO
// =======================


document.addEventListener(

"DOMContentLoaded",

()=>{


carregarDados();


atualizarDashboard();

iniciarConta();

iniciarVenda();

iniciarNavegacao();
}

);
