// =================================
// DASHTIK STORAGE
// BANCO LOCAL
// =================================


// ================= PRODUTOS =================


function pegarProdutos(){

    let produtos = localStorage.getItem("produtos");

    if(produtos){

        return JSON.parse(produtos);

    }

    return [];

}



function salvarProdutos(produtos){

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

}



function adicionarProduto(produto){

    let produtos = pegarProdutos();

    produtos.push(produto);

    salvarProdutos(produtos);

}



function removerProduto(id){

    let produtos = pegarProdutos();


    produtos = produtos.filter(
        produto => produto.id !== id
    );


    salvarProdutos(produtos);

}





// ================= VENDAS =================



function pegarVendas(){


    let vendas =
    localStorage.getItem("vendas");



    if(vendas){

        return JSON.parse(vendas);

    }


    return [];

}




function salvarVendas(vendas){


    localStorage.setItem(
        "vendas",
        JSON.stringify(vendas)
    );


}





function adicionarVenda(venda){


    let vendas =
    pegarVendas();



    vendas.push(venda);



    salvarVendas(vendas);


}
