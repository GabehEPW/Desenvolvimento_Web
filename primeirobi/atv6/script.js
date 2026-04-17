const input = document.getElementById("tarefaInput");
const botao = document.getElementById("addBtn");
const lista = document.getElementById("lista");

botao.addEventListener("click", adicionarTarefa);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        adicionarTarefa();
    }
});

function adicionarTarefa() {
    const texto = input.value.trim();

    if (texto === "") return;

    const li = document.createElement("li");

    li.innerHTML = `<input type="checkbox"> <span>${texto}</span>`;

    lista.appendChild(li);

    input.value = "";
}

lista.addEventListener("click", (evento) => {

    if (evento.target.type === "checkbox") {
        const li = evento.target.parentElement;
        li.classList.toggle("completed");
        return;
    }

    if (evento.target.tagName === "LI" || evento.target.tagName === "SPAN") {
        const li = evento.target.closest("li");
        li.remove();
    }
});