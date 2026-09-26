// =====================================
// DASHTIK V3.5.1
// STORAGE
// =====================================



// ===============================
// PRODUTOS
// ===============================


function pegarProdutos(){

    let dados = localStorage.getItem("produtos");


    if(dados){

        return JSON.parse(dados);

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








// ===============================
// VENDAS
// ===============================


function pegarVendas(){

    let dados = localStorage.getItem("vendas");


    if(dados){

        return JSON.parse(dados);

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

    let vendas = pegarVendas();


    vendas.push(venda);


    salvarVendas(vendas);

}
