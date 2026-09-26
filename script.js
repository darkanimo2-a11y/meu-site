// =====================================
// DASHTIK V4
// SCRIPT PRINCIPAL
// =====================================



// ===============================
// NAVEGAÇÃO
// ===============================


function abrirProdutos(){

    window.location.href="produtos.html";

}



function abrirVendas(){

    window.location.href="vendas.html";

}



function abrirRelatorios(){

    window.location.href="relatorios.html";

}



function voltarDashboard(){

    window.location.href="index.html";

}








// ===============================
// PRODUTOS
// ===============================


function cadastrar(){


let nome =
document.getElementById("nome").value;


let preco =
document.getElementById("preco").value;


let estoque =
document.getElementById("estoque").value;



if(
nome==="" ||
preco==="" ||
estoque===""
){

alert("Preencha todos os campos!");

return;

}




let produto={


id:Date.now(),


nome:nome,


preco:Number(preco),


estoque:Number(estoque)


};





adicionarProduto(produto);



alert("Produto cadastrado!");



listarProdutos();


atualizarDashboard();



}







function listarProdutos(){


let tabela =
document.getElementById("lista");



if(!tabela){

return;

}



let produtos =
pegarProdutos();



tabela.innerHTML="";



produtos.forEach(produto=>{


tabela.innerHTML += `


<tr>

<td>${produto.nome}</td>

<td>R$ ${produto.preco}</td>

<td>${produto.estoque}</td>


<td>

<button onclick="excluirProduto(${produto.id})">

🗑

</button>

</td>


</tr>


`;


});


}







function excluirProduto(id){


removerProduto(id);


listarProdutos();


atualizarDashboard();


}









// ===============================
// FINANCEIRO
// ===============================


function calcularFaturamento(){


let vendas =
pegarVendas();



let total=0;



vendas.forEach(venda=>{


total += Number(venda.valor);


});



return total;


}







function calcularMeta(){


let meta =
pegarMeta();



let faturamento =
calcularFaturamento();





let percentual=0;



if(meta>0){

percentual =
(faturamento/meta)*100;

}





return {


meta:meta,


faturamento:faturamento,


percentual:percentual,


falta:
Math.max(
meta-faturamento,
0
)


};


}









// ===============================
// SALVAR META
// ===============================


function definirMeta(){


let valor =
document.getElementById("metaMensal").value;



if(valor===""){

alert("Digite uma meta!");

return;

}



salvarMeta(
Number(valor)
);



alert("Meta salva!");



atualizarMeta();


}









function atualizarMeta(){


let dados =
calcularMeta();



let campoMeta =
document.getElementById("valorMeta");



if(campoMeta){

campoMeta.innerHTML =
"R$ "+
dados.meta.toLocaleString("pt-BR");

}




let campoRealizado =
document.getElementById("valorRealizado");



if(campoRealizado){

campoRealizado.innerHTML =
"R$ "+
dados.faturamento.toLocaleString("pt-BR");

}





let campoProgresso =
document.getElementById("progressoMeta");



if(campoProgresso){

campoProgresso.innerHTML =
dados.percentual.toFixed(1)+"%";

}



let campoFalta =
document.getElementById("faltaMeta");



if(campoFalta){

campoFalta.innerHTML =
"R$ "+
dados.falta.toLocaleString("pt-BR");

}


}









// ===============================
// DASHBOARD
// ===============================


function atualizarDashboard(){



let produtos =
pegarProdutos();



let vendas =
pegarVendas();





let totalProdutos =
document.getElementById("totalProdutos");



if(totalProdutos){

totalProdutos.innerHTML =
produtos.length;

}







let totalVendas =
document.getElementById("totalVendas");



if(totalVendas){

totalVendas.innerHTML =
vendas.length;

}







let faturamento =
document.getElementById("faturamento");



let total =
calcularFaturamento();



if(faturamento){

faturamento.innerHTML =
"R$ "+
total.toLocaleString("pt-BR");

}






atualizarMeta();



mostrarVendasDashboard();


}









// ===============================
// ÚLTIMAS VENDAS
// ===============================


function mostrarVendasDashboard(){



let tabela =
document.getElementById("listaVendasDashboard");



if(!tabela){

return;

}



let vendas =
pegarVendas();



tabela.innerHTML="";



vendas
.slice(-5)
.reverse()
.forEach(venda=>{


tabela.innerHTML += `


<tr>

<td>${venda.produto}</td>

<td>${venda.quantidade}</td>

<td>R$ ${venda.valor}</td>

</tr>


`;


});


}









// ===============================
// VENDAS
// ===============================


function registrarVenda(){


let id =
Number(
document.getElementById("produtoVenda").value
);



let quantidade =
Number(
document.getElementById("quantidadeVenda").value
);



let produtos =
pegarProdutos();





let produto =
produtos.find(
p=>p.id===id
);





if(!produto){

return;

}





if(quantidade > produto.estoque){

alert("Estoque insuficiente");

return;

}





produto.estoque -= quantidade;



salvarProdutos(produtos);





adicionarVenda({


id:Date.now(),


produto:produto.nome,


quantidade:quantidade,


valor:
produto.preco*quantidade,


data:
new Date()
.toLocaleDateString("pt-BR")


});





alert("Venda realizada!");



atualizarDashboard();



}









document.addEventListener(
"DOMContentLoaded",
()=>{


atualizarDashboard();


listarProdutos();


atualizarMeta();


});
