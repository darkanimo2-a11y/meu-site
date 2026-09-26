// =================================
// DASHTIK - STORAGE
// BANCO LOCAL
// =================================


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
