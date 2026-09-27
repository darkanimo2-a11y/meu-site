console.log("VendaPro iniciado 🚀");


const DB_KEY="vendapro_database";

const META_SEGUIDORES = 2000;



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

faturamento += Number(v.valor);

});



let cards=document.querySelectorAll(".card h2");


cards[0].innerHTML=moeda(faturamento);

cards[1].innerHTML=database.vendas.length;

cards[2].innerHTML=moeda(faturamento);

cards[3].innerHTML=database.contas.length;



renderizarContas();

renderizarVendas();


}







function progressoSeguidores(valor){


let porcentagem =
Math.min(
100,
Math.round((valor/META_SEGUIDORES)*100)
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








function renderizarContas(){


let tabela=document.querySelector("#listaContas");


if(!tabela)return;


tabela.innerHTML="";



database.contas.forEach((c,index)=>{


let tr=document.createElement("tr");


tr.innerHTML=`

<td>${c.nome}</td>

<td>${c.seguidores}</td>


<td>

${progressoSeguidores(c.seguidores)}

</td>


<td>${moeda(c.custo)}</td>


<td>${moeda(c.precoVenda)}</td>


<td>

<span class="status">
${c.status}
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



tabela.appendChild(tr);


});


}








function renderizarVendas(){


let tabela=document.querySelector("#listaVendas");


if(!tabela)return;


tabela.innerHTML="";



database.vendas
.slice()
.reverse()
.forEach((v,index)=>{


let tr=document.createElement("tr");


tr.innerHTML=`

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


tabela.appendChild(tr);



});


}









function removerConta(index){


if(confirm("Deseja excluir esta conta?")){


database.contas.splice(index,1);


salvarDados();

atualizarDashboard();


}


}






function removerVenda(index){


if(confirm("Deseja excluir esta venda?")){


database.vendas.splice(index,1);


salvarDados();

atualizarDashboard();


}


}








function iniciarVenda(){


document
.getElementById("novaVenda")
.addEventListener("click",()=>{


let conta=prompt("Conta:");

let cliente=prompt("Cliente:");

let valor=prompt("Valor:");



database.vendas.push({

conta,

cliente,

valor:Number(valor)

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

let custo=prompt("Compra:");

let precoVenda=prompt("Venda:");



database.contas.push({

nome,

seguidores:Number(seguidores),

custo:Number(custo),

precoVenda:Number(precoVenda),

status:"Disponível"

});


salvarDados();

atualizarDashboard();


});


}







document.addEventListener(
"DOMContentLoaded",
()=>{


carregarDados();

atualizarDashboard();

iniciarConta();

iniciarVenda();


});
