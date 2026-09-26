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