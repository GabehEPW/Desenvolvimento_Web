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

        // Verifica se o reCAPTCHA carregou
        if (typeof grecaptcha === "undefined") {
            mostrarStatus("O reCAPTCHA ainda não carregou. Tente novamente.", "erro");
            return;
        }

        // Pega a resposta do reCAPTCHA
        const recaptchaToken = grecaptcha.getResponse();

        // Impede o envio se o captcha não foi marcado
        if (recaptchaToken === "") {
            mostrarStatus("Confirme o reCAPTCHA antes de enviar.", "erro");
            return;
        }

        // Desativa o botão enquanto envia
        botao.disabled = true;
        botao.textContent = "Enviando...";

        mostrarStatus("Enviando mensagem...", "carregando");

        try {
            // Simulação do envio por enquanto
            await new Promise(function (resolve) {
                setTimeout(resolve, 1200);
            });

            mostrarStatus("Mensagem enviada com sucesso!", "sucesso");

            formContato.reset();
            grecaptcha.reset();

        } catch (error) {
            mostrarStatus("Erro ao enviar mensagem. Tente novamente.", "erro");
            console.error(error);
            grecaptcha.reset();

        } finally {
            botao.disabled = false;
            botao.textContent = "Enviar";
        }
    });
}