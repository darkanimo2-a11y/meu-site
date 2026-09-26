// =====================================
// DASHTIK V3.4
// STORAGE - BANCO LOCAL
// =====================================


// ===============================
// PRODUTOS
// ===============================


function pegarProdutos(){

    const dados = localStorage.getItem("produtos");


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

    const dados = localStorage.getItem("vendas");



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
