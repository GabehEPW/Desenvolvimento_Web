import { useState } from "react";
import Button from "./Button";
import "../styles/contact.css";

type StatusType = "sucesso" | "erro" | "carregando" | "";

export default function ContactForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState<StatusType>("");
    const [loading, setLoading] = useState(false);

    function emailValido(email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (email.trim() === "") {
            setStatus("Digite seu e-mail antes de enviar.");
            setStatusType("erro");
            return;
        }

        if (!emailValido(email)) {
            setStatus("Digite um e-mail válido.");
            setStatusType("erro");
            return;
        }

        if (message.trim() === "") {
            setStatus("Digite o motivo do contato.");
            setStatusType("erro");
            return;
        }

        if (message.trim().length < 10) {
            setStatus("Digite uma mensagem com pelo menos 10 caracteres.");
            setStatusType("erro");
            return;
        }

        setLoading(true);
        setStatus("Enviando mensagem...");
        setStatusType("carregando");

        try {
            const response = await fetch("/.netlify/functions/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    mensagem: message
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.erro || "Erro ao enviar mensagem.");
            }

            setStatus("Mensagem enviada com sucesso!");
            setStatusType("sucesso");
            setEmail("");
            setMessage("");
        } catch (error) {
            if (error instanceof Error) {
                setStatus(error.message);
            } else {
                setStatus("Erro ao enviar mensagem.");
            }

            setStatusType("erro");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="contact" className="container">
            <header>
                <span>Contato</span>

                <h2>Entre em contato</h2>

                <p>
                    Envie uma dúvida sobre montagem de computadores, peças compatíveis
                    ou sugestões de configuração.
                </p>
            </header>

            <form className="contact-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <textarea
                    placeholder="Motivo do contato. Ex: Gostei muito do ComputSpace, poderia me enviar um orçamento?"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />

                <Button
                    text={loading ? "Enviando..." : "Enviar"}
                    type="submit"
                    disabled={loading}
                />

                {status && <small className={statusType}>{status}</small>}
            </form>
        </section>
    );
}