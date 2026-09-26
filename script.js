// =====================================
// DASHTIK V3.2
// SCRIPT PRINCIPAL
// =====================================



// ===============================
// NAVEGAÇÃO
// ===============================


function abrirProdutos(){

    window.location.href = "produtos.html";

}



function abrirVendas(){

    window.location.href = "vendas.html";

}



function voltarDashboard(){

    window.location.href = "index.html";

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
// DASHBOARD
// ===============================


function atualizarDashboard(){


    let produtos =
    pegarProdutos();



    let totalProdutos =
    document.getElementById("totalProdutos");



    let totalEstoque =
    document.getElementById("totalEstoque");



    let valorEstoque =
    document.getElementById("valorEstoque");





    let qtdProdutos =
    produtos.length;



    let estoque = 0;


    let valor = 0;



    produtos.forEach(produto=>{


        estoque += Number(produto.estoque);


        valor +=
        Number(produto.preco) *
        Number(produto.estoque);


    });





    if(totalProdutos){

        totalProdutos.innerHTML =
        qtdProdutos;

    }





    if(totalEstoque){

        totalEstoque.innerHTML =
        estoque;

    }





    if(valorEstoque){

        valorEstoque.innerHTML =
        "R$ " +
        valor.toLocaleString("pt-BR");

    }




}









// ===============================
// VENDAS
// ===============================



function carregarProdutosVenda(){



    let select =
    document.getElementById("produtoVenda");



    if(!select){

        return;

    }



    let produtos =
    pegarProdutos();



    select.innerHTML="";




    produtos.forEach(produto=>{


        select.innerHTML += `


        <option value="${produto.id}">

        ${produto.nome} 
        - Estoque: ${produto.estoque}

        </option>


        `;


    });



}








function registrarVenda(){



    let produtoId =
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
        p => p.id === produtoId
    );





    if(!produto){

        alert("Produto não encontrado");

        return;

    }





    if(quantidade > produto.estoque){

        alert("Estoque insuficiente!");

        return;

    }





    produto.estoque -= quantidade;





    salvarProdutos(produtos);





    let venda = {


        id:Date.now(),


        produto:produto.nome,


        quantidade:quantidade,


        valor:
        produto.preco * quantidade,


        data:
        new Date().toLocaleDateString("pt-BR")


    };





    adicionarVenda(venda);





    alert("Venda registrada!");





    carregarProdutosVenda();


    listarVendas();


    atualizarDashboard();



}








function listarVendas(){



    let tabela =
    document.getElementById("listaVendas");



    if(!tabela){

        return;

    }



    let vendas =
    pegarVendas();



    tabela.innerHTML="";





    vendas.forEach(venda=>{


        tabela.innerHTML += `


        <tr>


        <td>
        ${venda.produto}
        </td>


        <td>
        ${venda.quantidade}
        </td>


        <td>
        R$ ${venda.valor}
        </td>


        </tr>


        `;


    });



}









// ===============================
// INICIALIZAÇÃO
// ===============================


document.addEventListener(
"DOMContentLoaded",
()=>{


    atualizarDashboard();


    listarProdutos();


    carregarProdutosVenda();


    listarVendas();



});
