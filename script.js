const numbers = document.querySelectorAll("[data-value]");


numbers.forEach(number=>{


let target = Number(number.dataset.value);

let current = 0;


let timer=setInterval(()=>{


current += Math.ceil(target/60);


if(current >= target){

current=target;

clearInterval(timer);

}


number.innerHTML =
current.toLocaleString("pt-BR");


},30);



});

function cadastrar(){


let nome =
document.getElementById("nome").value;


let preco =
document.getElementById("preco").value;


let estoque =
document.getElementById("estoque").value;



let produto = {


id: Date.now(),

nome:nome,

preco:preco,

estoque:estoque


};



adicionarProduto(produto);



mostrarProdutos();



}



function mostrarProdutos(){


let lista =
document.getElementById("lista");



if(!lista) return;



lista.innerHTML="";



let produtos =
pegarProdutos();



produtos.forEach(produto=>{


lista.innerHTML += `

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

<button onclick="excluir(${produto.id})">

🗑

</button>

</td>


</tr>


`;


});


}




function excluir(id){

removerProduto(id);

mostrarProdutos();

}




function abrirFormulario(){


let form =
document.getElementById("formulario");


form.style.display="block";


}



mostrarProdutos();
