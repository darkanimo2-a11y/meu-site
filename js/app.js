console.log("VendaPro iniciado 🚀");


const DB_KEY="vendapro_database";


let database={

contas:[],
vendas:[]

};





function carregarDados(){


let dados=localStorage.getItem(DB_KEY);



if(dados){

database=JSON.parse(dados);

}else{

salvarDados();

}


}






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


let faturamento=0;


database.vendas.forEach(v=>{

faturamento+=Number(v.valor);

});



let cards=document.querySelectorAll(".card h2");



if(cards.length>=4){


cards[0].innerHTML=moeda(faturamento);


cards[1].innerHTML=database.vendas.length;


cards[2].innerHTML=moeda(faturamento);


cards[3].innerHTML=database.contas.length;


}



renderizarVendas();

renderizarContas();


}







function renderizarVendas(){


let tabela=document.querySelector("#listaVendas");


if(!tabela)return;


tabela.innerHTML="";



database.vendas.slice().reverse()
.forEach(v=>{


let tr=document.createElement("tr");


tr.innerHTML=`

<td>${v.conta}</td>

<td>${v.cliente}</td>

<td>${moeda(v.valor)}</td>

`;


tabela.appendChild(tr);


});


}








function renderizarContas(){


let tabela=document.querySelector("#listaContas");


if(!tabela)return;


tabela.innerHTML="";



database.contas.forEach(c=>{


let tr=document.createElement("tr");


tr.innerHTML=`

<td>${c.nome}</td>

<td>${c.seguidores}</td>

<td>${moeda(c.custo)}</td>

<td>${moeda(c.precoVenda)}</td>

<td>
<span class="status">
${c.status}
</span>
</td>

`;


tabela.appendChild(tr);


});


}








function iniciarVenda(){


document
.getElementById("novaVenda")
.addEventListener("click",()=>{


let conta=prompt("Nome da conta:");

let cliente=prompt("Cliente:");

let valor=prompt("Valor:");



database.vendas.push({

conta,

cliente,

valor:Number(valor),

data:new Date()

});



salvarDados();

atualizarDashboard();


});

}




function iniciarConta(){


document
.getElementById("novaConta")
.addEventListener("click",()=>{


let nome=prompt("Nome da conta:");

let seguidores=prompt("Seguidores:");

let custo=prompt("Valor de compra:");

let precoVenda=prompt("Preço de venda:");



database.contas.push({

nome,

seguidores:Number(seguidores),

custo:Number(custo),

precoVenda:Number(precoVenda),

status:"Disponível"

});



salvarDados();

atualizarDashboard();


alert("Conta cadastrada 🚀");


});


}







document.addEventListener(
"DOMContentLoaded",
()=>{


carregarDados();

atualizarDashboard();

iniciarVenda();

iniciarConta();


});
