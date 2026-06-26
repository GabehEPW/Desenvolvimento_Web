// Mostra no console que o JavaScript carregou
console.log("Site carregado com sucesso.");

// Pega o formulário pelo id
const formContato = document.getElementById("form-contato");

// Pega a mensagem de status
const mensagemStatus = document.getElementById("mensagem-status");

// Mostra mensagens para o usuário
function mostrarStatus(texto, tipo) {
    mensagemStatus.textContent = texto;
    mensagemStatus.className = tipo;
}

// Remove erro dos campos
function limparErros(campos) {
    campos.forEach(function (campo) {
        campo.classList.remove("campo-erro");
    });
}

// Valida o formato do email
function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Verifica se o formulário existe
if (formContato) {
    formContato.addEventListener("submit", async function (event) {
        event.preventDefault();

        const campoEmail = formContato.email;
        const campoMensagem = formContato.mensagem;
        const botao = formContato.querySelector("button");

        limparErros([campoEmail, campoMensagem]);

        const email = campoEmail.value.trim();
        const mensagem = campoMensagem.value.trim();

        // Verifica se o email foi preenchido
        if (email === "") {
            campoEmail.classList.add("campo-erro");
            mostrarStatus("Digite seu email antes de enviar.", "erro");
            return;
        }

        // Verifica se o email é válido
        if (!emailValido(email)) {
            campoEmail.classList.add("campo-erro");
            mostrarStatus("Digite um email válido.", "erro");
            return;
        }

        // Verifica se a mensagem foi preenchida
        if (mensagem === "") {
            campoMensagem.classList.add("campo-erro");
            mostrarStatus("Digite o motivo do contato.", "erro");
            return;
        }

        // Evita mensagem muito pequena
        if (mensagem.length < 10) {
            campoMensagem.classList.add("campo-erro");
            mostrarStatus("Digite uma mensagem com pelo menos 10 caracteres.", "erro");
            return;
        }

        // Desativa o botão enquanto envia
        botao.disabled = true;
        botao.textContent = "Enviando...";

        mostrarStatus("Enviando mensagem...", "carregando");

        try {
            // Dados enviados para a função do Netlify
            const dados = {
                email: email,
                mensagem: mensagem
            };

            // Chama a Netlify Function
            const resposta = await fetch("/.netlify/functions/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();

            // Se a função retornar erro, mostra o erro real
            if (!resposta.ok) {
                throw new Error(resultado.erro || "Erro ao enviar mensagem.");
            }

            mostrarStatus("Mensagem enviada com sucesso!", "sucesso");

            formContato.reset();

        } catch (error) {
            mostrarStatus(error.message, "erro");
            console.error(error);

        } finally {
            botao.disabled = false;
            botao.textContent = "Enviar";
        }
    });
}