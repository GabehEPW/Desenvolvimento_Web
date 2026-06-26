exports.handler = async function (event) {
    // Aceita apenas envio por POST
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ erro: "Método não permitido." })
        };
    }

    try {
        // Pega os dados enviados pelo formulário
        const { email, mensagem } = JSON.parse(event.body);

        // Confere se os dados chegaram completos
        if (!email || !mensagem) {
            return {
                statusCode: 400,
                body: JSON.stringify({ erro: "Dados incompletos." })
            };
        }

        // Confere se a chave do Resend existe no Netlify
        if (!process.env.RESEND_API_KEY) {
            return {
                statusCode: 500,
                body: JSON.stringify({ erro: "Variável RESEND_API_KEY não configurada." })
            };
        }

        // Confere se o email de destino existe no Netlify
        if (!process.env.CONTACT_TO_EMAIL) {
            return {
                statusCode: 500,
                body: JSON.stringify({ erro: "Variável CONTACT_TO_EMAIL não configurada." })
            };
        }

        // Envia o e-mail usando Resend
        const respostaEmail = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
                from: "ComputSpace <onboarding@resend.dev>",
                to: [process.env.CONTACT_TO_EMAIL],
                subject: "Novo contato pelo site ComputSpace",
                html: `
                    <h2>Novo contato pelo site ComputSpace</h2>
                    <p><strong>Email informado:</strong> ${email}</p>
                    <p><strong>Mensagem:</strong></p>
                    <p>${mensagem}</p>
                `
            })
        });

        const resultadoEmail = await respostaEmail.json();

        // Se o Resend der erro
        if (!respostaEmail.ok) {
            console.error("Erro do Resend:", resultadoEmail);

            return {
                statusCode: respostaEmail.status,
                body: JSON.stringify({
                    erro: resultadoEmail.message || "Erro ao enviar e-mail."
                })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ mensagem: "E-mail enviado com sucesso!" })
        };

    } catch (error) {
        console.error("Erro interno:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({ erro: "Erro interno no servidor." })
        };
    }
};