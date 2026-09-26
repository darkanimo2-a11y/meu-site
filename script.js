// =====================================
// DASHTIK V3.3
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
// DASHBOARD V3.3
// ===============================


function atualizarDashboard(){



    let produtos =
    pegarProdutos();



    let vendas =
    pegarVendas();





    // PRODUTOS


    let campoProdutos =
    document.getElementById("totalProdutos");



    if(campoProdutos){

        campoProdutos.innerHTML =
        produtos.length;

    }






    // VENDAS


    let campoVendas =
    document.getElementById("totalVendas");



    if(campoVendas){

        campoVendas.innerHTML =
        vendas.length;

    }







    // FATURAMENTO


    let faturamento = 0;



    vendas.forEach(venda=>{


        faturamento += Number(venda.valor);


    });





    let campoFaturamento =
    document.getElementById("faturamento");



    if(campoFaturamento){

        campoFaturamento.innerHTML =
        "R$ " +
        faturamento.toLocaleString("pt-BR");

    }







    // TICKET MÉDIO


    let ticket = 0;



    if(vendas.length > 0){

        ticket =
        faturamento / vendas.length;

    }






    let campoTicket =
    document.getElementById("ticketMedio");



    if(campoTicket){

        campoTicket.innerHTML =
        "R$ " +
        ticket.toLocaleString("pt-BR");

    }






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
        | Estoque:
        ${produto.estoque}

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
