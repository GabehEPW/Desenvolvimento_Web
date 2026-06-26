import type { Handler } from "@netlify/functions";
import * as nodemailer from "nodemailer";

interface ContactPayload {
    email: string;
    mensagem: string;
    recaptchaToken?: string;
}

interface ErrorResponse {
    erro: string;
}

interface SuccessResponse {
    mensagem: string;
}

// Monta uma resposta padrão para a função
function criarResposta(statusCode: number, body: ErrorResponse | SuccessResponse) {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    };
}

// Valida formato básico de e-mail
function emailValido(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function recaptchaValido(token: string) {
    const params = new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY ?? "",
        response: token
    });

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
    });

    const result = await response.json() as { success?: boolean };

    return result.success === true;
}

// Evita inserir HTML direto no corpo do e-mail
function escaparHtml(valor: string) {
    return valor
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export const handler: Handler = async (event) => {
    // Aceita apenas envio por POST
    if (event.httpMethod !== "POST") {
        return criarResposta(405, { erro: "Método não permitido." });
    }

    try {
        // Confere se existe corpo na requisição
        if (!event.body) {
            return criarResposta(400, { erro: "Corpo da requisição vazio." });
        }

        // Pega os dados enviados pelo formulário
        const { email, mensagem, recaptchaToken } = JSON.parse(event.body) as ContactPayload;

        // Confere se os dados chegaram completos
        if (!email || !mensagem) {
            return criarResposta(400, { erro: "Dados incompletos." });
        }

        // Confere se o e-mail é válido
        if (!emailValido(email)) {
            return criarResposta(400, { erro: "E-mail inválido." });
        }

        // Confere se o reCAPTCHA foi preenchido no formulário
        if (!recaptchaToken) {
            return criarResposta(400, { erro: "Confirme o reCAPTCHA antes de enviar." });
        }

        // Confere se a chave secreta do reCAPTCHA existe
        if (!process.env.RECAPTCHA_SECRET_KEY) {
            return criarResposta(500, { erro: "Variável RECAPTCHA_SECRET_KEY não configurada." });
        }

        // Valida o token do reCAPTCHA com o Google antes de enviar o e-mail
        if (!await recaptchaValido(recaptchaToken)) {
            return criarResposta(400, { erro: "reCAPTCHA inválido ou expirado. Tente novamente." });
        }

        // Confere se o e-mail do Gmail existe
        if (!process.env.GMAIL_USER) {
            return criarResposta(500, { erro: "Variável GMAIL_USER não configurada." });
        }

        // Confere se a senha do Gmail existe
        if (!process.env.GMAIL_PASS) {
            return criarResposta(500, { erro: "Variável GMAIL_PASS não configurada." });
        }

        // Configuração SMTP do Gmail
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const emailSeguro = escaparHtml(email);
        const mensagemSegura = escaparHtml(mensagem).replace(/\n/g, "<br />");

        // Envia o e-mail para o endereço informado pelo usuário
        await transporter.sendMail({
            from: `"ComputSpace" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Contato recebido pelo ComputSpace",
            html: `
                <h2>Contato recebido pelo site ComputSpace</h2>
                <p>Olá, agradecemos seu contato e recebemos sua mensagem por meio do formulário do ComputSpace.</p>
                <p>Em breve, nossa equipe analisará sua solicitação e retornará o mais rápido possível, geralmente dentro de até 24 horas.</p>

                <p><strong>E-mail informado:</strong> ${emailSeguro}</p>

                <p><strong>Mensagem enviada:</strong></p>
                <p>${mensagemSegura}</p>

                <hr />

                <p>
                    Esta mensagem foi enviada automaticamente pelo projeto ComputSpace.
                </p>
            `
        });

        return criarResposta(200, { mensagem: "E-mail enviado com sucesso!" });

    } catch (error) {
        console.error("Erro interno:", error);

        return criarResposta(500, { erro: "Erro ao enviar e-mail." });
    }
};
