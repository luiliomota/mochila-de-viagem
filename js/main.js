const form = document.getElementById("novoItem");
const limp = document.getElementById("limpar");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];
const formJson = document.getElementById("novoJson");

itens.forEach( (elemento) => {
    criaElemento(elemento);
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    const existe = itens.find(elemento => elemento.nome === itemAtual.nome);
    if (existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }else {
        itemAtual.id = itens[itens.length - 1] ? itens[itens.length -1].id + 1 : 0;
        criaElemento(itemAtual);
        itens.push(itemAtual);
    }
    localStorage.setItem("itens", JSON.stringify(itens));
    nome.value = "";
    quantidade.value = "";
})

limp.addEventListener("click", function () {
    limparLista();
})

formJson.addEventListener("submit", (evento) => {
    evento.preventDefault();
    inserirJson(evento.target.elements['codigo'].value);
})

function criaElemento(item) {
    const novoItem = document.createElement("li");
    const numeroItem = document.createElement("strong");
    novoItem.classList.add("item");
    numeroItem.dataset.id = item.id;
    numeroItem.innerHTML = item.quantidade;
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id));
    lista.appendChild(novoItem);
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id){
    const botao = document.createElement("button");
    botao.innerText = "X";
    botao.addEventListener("click",function (){
        deletaElemento(this.parentNode, id);
    })
    return botao;
}

function deletaElemento(tag, id){
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id),1);
    localStorage.setItem("itens", JSON.stringify(itens));
}

function limparLista(){
    lista.remove();
    itens.splice(itens);
    localStorage.setItem("itens", JSON.stringify(itens));
}

function inserirJson(json){
    console.log(json);
    localStorage.setItem("itens", json);
    JSON.parse(localStorage.getItem("itens")).forEach( (elemento) => {
        criaElemento(elemento);
    })
}
