// ================================
// VENDA PRO - SISTEMA PRINCIPAL
// ================================


console.log("VendaPro iniciado 🚀");


// Banco local

const DB_KEY = "vendapro_database";



function carregarDados(){

    const dados = localStorage.getItem(DB_KEY);


    if(dados){

        return JSON.parse(dados);

    }


    return {

        contas: [],

        vendas: []

    };

}




function salvarDados(){

    localStorage.setItem(
        DB_KEY,
        JSON.stringify(database)
    );

}



let database = carregarDados();





// Formatar dinheiro

function moeda(valor){

    return Number(valor)
    .toLocaleString(
        "pt-BR",
        {
            style:"currency",
            currency:"BRL"
        }
    );

}





// Atualizar dashboard

function atualizarDashboard(){


    let faturamento = 0;


    database.vendas.forEach(venda=>{

        faturamento += Number(venda.valor);

    });



    const cards =
    document.querySelectorAll(".card h2");



    if(cards.length >= 4){


        cards[0].innerHTML =
        moeda(faturamento);



        cards[1].innerHTML =
        database.vendas.length;



        cards[2].innerHTML =
        moeda(faturamento);



        cards[3].innerHTML =
        database.contas.length;


    }



}



atualizarDashboard();
