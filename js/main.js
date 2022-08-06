const form = document.getElementById("novoItem")

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    console.log(evento);
})