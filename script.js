// =====================================
// DASHTIK V3.4
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
// DASHBOARD
// ===============================


function atualizarDashboard(){



    let produtos =
    pegarProdutos();



    let vendas =
    pegarVendas();






    let totalProdutos =
    document.getElementById("totalProdutos");



    let totalVendas =
    document.getElementById("totalVendas");



    let faturamento =
    document.getElementById("faturamento");



    let ticket =
    document.getElementById("ticketMedio");







    if(totalProdutos){

        totalProdutos.innerHTML =
        produtos.length;

    }





    if(totalVendas){

        totalVendas.innerHTML =
        vendas.length;

    }






    let totalFaturamento = 0;



    vendas.forEach(venda=>{


        totalFaturamento += Number(venda.valor);


    });






    if(faturamento){

        faturamento.innerHTML =
        "R$ " +
        totalFaturamento.toLocaleString("pt-BR");

    }







    let media = 0;



    if(vendas.length > 0){

        media =
        totalFaturamento / vendas.length;

    }





    if(ticket){

        ticket.innerHTML =
        "R$ " +
        media.toLocaleString("pt-BR");

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
// GRÁFICO
// ===============================


function criarGrafico(){



    let canvas =
    document.getElementById("graficoVendas");



    if(!canvas){

        return;

    }




    let vendas =
    pegarVendas();



    if(vendas.length === 0){

        return;

    }




    let nomes = [];

    let valores = [];




    vendas.forEach(venda=>{


        nomes.push(
            venda.produto
        );



        valores.push(
            Number(venda.valor)
        );


    });






    new Chart(canvas,{


        type:"bar",



        data:{


            labels:nomes,



            datasets:[{

                label:"Faturamento",

                data:valores


            }]


        },



        options:{


            responsive:true,


            maintainAspectRatio:false,


            scales:{


                y:{


                    beginAtZero:true


                }


            }



        }



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
        item => item.id === produtoId
    );





    if(!produto){

        alert("Produto inválido");

        return;

    }







    if(quantidade > produto.estoque){

        alert("Estoque insuficiente");

        return;

    }







    produto.estoque -= quantidade;



    salvarProdutos(produtos);







    let venda = {


        id:Date.now(),


        produto:produto.nome,


        quantidade:quantidade,


        valor:
        produto.preco * quantidade


    };





    adicionarVenda(venda);




    alert("Venda realizada!");



    atualizarDashboard();



    carregarProdutosVenda();



    listarVendas();



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


    criarGrafico();


});
