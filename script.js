// =================================
// DASHTIK - SCRIPT
// =================================



function abrirProdutos(){

    window.location.href = "produtos.html";

}




function voltarDashboard(){

    window.location.href = "index.html";

}







function cadastrar(){


    let nome =
    document.getElementById("nome").value;



    let preco =
    document.getElementById("preco").value;



    let estoque =
    document.getElementById("estoque").value;



    if(nome === "" || preco === "" || estoque === ""){

        alert("Preencha todos os campos");

        return;

    }



    let produto = {

        id: Date.now(),

        nome:nome,

        preco:Number(preco),

        estoque:Number(estoque)

    };



    adicionarProduto(produto);



    alert("Produto salvo!");



    document.getElementById("nome").value="";

    document.getElementById("preco").value="";

    document.getElementById("estoque").value="";



    listarProdutos();


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

}







function atualizarDashboard(){



    let produtos =
    pegarProdutos();



    let total =
    document.getElementById("totalProdutos");



    let estoque =
    document.getElementById("totalEstoque");



    let valor =
    document.getElementById("valorEstoque");




    let quantidadeProdutos =
    produtos.length;



    let totalEstoque = 0;

    let valorTotal = 0;



    produtos.forEach(produto=>{


        totalEstoque += produto.estoque;


        valorTotal += 
        produto.preco * produto.estoque;


    });





    if(total){

        total.innerHTML =
        quantidadeProdutos;

    }




    if(estoque){

        estoque.innerHTML =
        totalEstoque;

    }





    if(valor){

        valor.innerHTML =
        "R$ " + valorTotal.toLocaleString("pt-BR");

    }



}






document.addEventListener(
"DOMContentLoaded",
()=>{


    atualizarDashboard();

    listarProdutos();


});
