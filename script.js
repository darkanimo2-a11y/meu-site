// =====================================
// DASHTIK V3.5.1
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




    if(nome==="" || preco==="" || estoque===""){

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







    let faturamento=0;



    vendas.forEach(venda=>{


        faturamento += Number(venda.valor);


    });







    let campoFaturamento =
    document.getElementById("faturamento");


    if(campoFaturamento){

        campoFaturamento.innerHTML =
        "R$ "+
        faturamento.toLocaleString("pt-BR");

    }







    let ticket=0;



    if(vendas.length>0){

        ticket =
        faturamento / vendas.length;

    }






    let campoTicket =
    document.getElementById("ticketMedio");


    if(campoTicket){

        campoTicket.innerHTML =
        "R$ "+
        ticket.toLocaleString("pt-BR");

    }








    // NOVOS INDICADORES


    let produtoTop =
    document.getElementById("produtoTop");


    if(produtoTop){

        produtoTop.innerHTML =
        produtoMaisVendido();

    }






    let baixo =
    document.getElementById("estoqueBaixo");


    if(baixo){

        baixo.innerHTML =
        estoqueBaixo();

    }






    let hoje =
    document.getElementById("vendasHoje");


    if(hoje){

        hoje.innerHTML =
        vendasHoje();

    }







    mostrarVendasDashboard();


}









// ===============================
// PRODUTO MAIS VENDIDO
// ===============================


function produtoMaisVendido(){


    let vendas =
    pegarVendas();



    if(vendas.length===0){

        return "-";

    }





    let ranking={};





    vendas.forEach(venda=>{


        if(!ranking[venda.produto]){

            ranking[venda.produto]=0;

        }



        ranking[venda.produto]
        += Number(venda.quantidade);



    });






    let maiorProduto="-";

    let maiorQuantidade=0;





    Object.keys(ranking)
    .forEach(produto=>{


        if(ranking[produto]>maiorQuantidade){


            maiorProduto=produto;


            maiorQuantidade=ranking[produto];


        }


    });





    return maiorProduto;



}









// ===============================
// ESTOQUE BAIXO
// ===============================


function estoqueBaixo(){


    let produtos =
    pegarProdutos();



    return produtos.filter(
        produto =>
        produto.estoque <=5
    ).length;


}









// ===============================
// VENDAS HOJE
// ===============================


function vendasHoje(){


    let vendas =
    pegarVendas();



    let hoje =
    new Date()
    .toLocaleDateString("pt-BR");




    return vendas.filter(
        venda =>
        venda.data === hoje
    ).length;


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
// GRÁFICO AGRUPADO
// ===============================


function criarGrafico(){



    let canvas =
    document.getElementById("graficoVendas");



    if(!canvas){

        return;

    }



    let vendas =
    pegarVendas();




    if(vendas.length===0){

        return;

    }




    let dados={};





    vendas.forEach(venda=>{


        if(!dados[venda.produto]){

            dados[venda.produto]=0;

        }



        dados[venda.produto]
        += Number(venda.valor);



    });






    new Chart(canvas,{


        type:"bar",


        data:{


            labels:Object.keys(dados),


            datasets:[{

                label:"Faturamento",

                data:Object.values(dados)

            }]


        },



        options:{


            responsive:true,


            maintainAspectRatio:false


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
        -
        Estoque:
        ${produto.estoque}

        </option>


        `;


    });


}







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
        item=>item.id===id
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


    carregarProdutosVenda();


}








document.addEventListener(
"DOMContentLoaded",
()=>{


    atualizarDashboard();


    listarProdutos();


    carregarProdutosVenda();


    criarGrafico();


});
