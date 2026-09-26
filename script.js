// =====================================
// DASHTIK V3.1
// SISTEMA PRINCIPAL
// =====================================



// ================================
// ATUALIZAR DASHBOARD
// ================================


function atualizarDashboard(){


let produtos = pegarProdutos();



let totalProdutos = produtos.length;


let estoqueTotal = 0;


let valorEstoque = 0;



produtos.forEach(produto => {


estoqueTotal += Number(produto.estoque);



valorEstoque += 
Number(produto.preco) *
Number(produto.estoque);



});




// CARD PRODUTOS

let campoProdutos =
document.getElementById("totalProdutos");


if(campoProdutos){

campoProdutos.innerHTML =
totalProdutos;

}



// CARD ESTOQUE

let campoEstoque =
document.getElementById("totalEstoque");


if(campoEstoque){

campoEstoque.innerHTML =
estoqueTotal;

}




// CARD VALOR

let campoValor =
document.getElementById("valorEstoque");


if(campoValor){

campoValor.innerHTML =
"R$ " +
valorEstoque.toLocaleString("pt-BR");

}



mostrarProdutosDashboard();



}





// =====================================
// MOSTRAR PRODUTOS NO DASHBOARD
// =====================================


function mostrarProdutosDashboard(){


let tabela =
document.getElementById("listaDashboard");



if(!tabela) return;



let produtos =
pegarProdutos();



tabela.innerHTML="";



produtos.slice(-5).reverse().forEach(produto=>{


tabela.innerHTML += `

<tr>

<td>
${produto.nome}
</td>


<td>
R$ ${produto.preco}
</td>


<td>
${produto.estoque}
</td>


</tr>

`;


});



}








// =====================================
// CADASTRAR PRODUTO
// =====================================


function cadastrar(){



let nome =
document.getElementById("nome").value;



let preco =
document.getElementById("preco").value;



let estoque =
document.getElementById("estoque").value;




if(
nome === "" ||
preco === "" ||
estoque === ""
){

alert("Preencha todos os campos!");

return;

}




let produto = {


id: Date.now(),


nome:nome,


preco:Number(preco),


estoque:Number(estoque)



};





adicionarProduto(produto);



alert("Produto cadastrado!");



mostrarProdutos();



atualizarDashboard();



}





// =====================================
// LISTAR PRODUTOS
// =====================================


function mostrarProdutos(){



let lista =
document.getElementById("lista");



if(!lista) return;




let produtos =
pegarProdutos();



lista.innerHTML="";




produtos.forEach(produto=>{


lista.innerHTML += `


<tr>


<td>
${produto.nome}
</td>



<td>
R$ ${produto.preco}
</td>



<td>
${produto.estoque}
</td>



<td>


<button onclick="excluir(${produto.id})">

🗑

</button>


</td>


</tr>



`;



});



}





// =====================================
// EXCLUIR PRODUTO
// =====================================


function excluir(id){



removerProduto(id);



mostrarProdutos();


atualizarDashboard();



}





// =====================================
// ABRIR FORMULÁRIO
// =====================================


function abrirFormulario(){



let formulario =
document.getElementById("formulario");



if(formulario){

formulario.style.display="block";

}



}





// =====================================
// INICIAR SISTEMA
// =====================================


document.addEventListener(
"DOMContentLoaded",
()=>{


atualizarDashboard();


mostrarProdutos();


}
);
