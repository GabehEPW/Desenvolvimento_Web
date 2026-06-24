// Mostra no console que o JavaScript carregou
console.log("Site carregado com sucesso.");

// Pega o formulário pelo id
const formContato = document.getElementById("form-contato");

// Pega o texto de status
const mensagemStatus = document.getElementById("mensagem-status");

// Verifica se o formulário existe na página
if (formContato) {
  formContato.addEventListener("submit", function (event) {
    event.preventDefault();

    mensagemStatus.textContent = "Mensagem pronta para ser enviada.";

    formContato.reset();
  });
}