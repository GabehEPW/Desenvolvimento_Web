import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import "../styles/contact.css";

type StatusType = "sucesso" | "erro" | "carregando" | "";

type RecaptchaApi = {
    render: (
        container: HTMLElement,
        parameters: {
            sitekey: string;
            theme?: "dark" | "light";
            callback: (token: string) => void;
            "expired-callback": () => void;
            "error-callback": () => void;
        }
    ) => number;
    reset: (widgetId?: number) => void;
};

declare global {
    interface Window {
        grecaptcha?: RecaptchaApi;
    }
}

export default function ContactForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [statusType, setStatusType] = useState<StatusType>("");
    const [loading, setLoading] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState("");

    const recaptchaRef = useRef<HTMLDivElement>(null);
    const recaptchaWidgetIdRef = useRef<number | null>(null);
    const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

    useEffect(() => {
        if (!recaptchaSiteKey || !recaptchaRef.current) {
            return;
        }

        let intervalId: number | undefined;

        function renderRecaptcha() {
            if (
                window.grecaptcha &&
                recaptchaRef.current &&
                recaptchaWidgetIdRef.current === null
            ) {
                recaptchaWidgetIdRef.current = window.grecaptcha.render(
                    recaptchaRef.current,
                    {
                        sitekey: recaptchaSiteKey,
                        theme: "dark",
                        callback: (token) => setRecaptchaToken(token),
                        "expired-callback": () => setRecaptchaToken(""),
                        "error-callback": () => {
                            setRecaptchaToken("");
                            setStatus("Erro ao carregar o reCAPTCHA. Tente novamente.");
                            setStatusType("erro");
                        }
                    }
                );

                if (intervalId) {
                    window.clearInterval(intervalId);
                    intervalId = undefined;
                }
            }
        }

        renderRecaptcha();

        if (!window.grecaptcha) {
            intervalId = window.setInterval(renderRecaptcha, 300);
        }

        return () => {
            if (intervalId) {
                window.clearInterval(intervalId);
            }
        };
    }, [recaptchaSiteKey]);

    function emailValido(email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function resetRecaptcha() {
        if (window.grecaptcha && recaptchaWidgetIdRef.current !== null) {
            window.grecaptcha.reset(recaptchaWidgetIdRef.current);
        }

        setRecaptchaToken("");
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

        if (!recaptchaSiteKey) {
            setStatus("reCAPTCHA não configurado.");
            setStatusType("erro");
            return;
        }

        if (!recaptchaToken) {
            setStatus("Confirme o reCAPTCHA antes de enviar.");
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
                    mensagem: message,
                    recaptchaToken
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
            resetRecaptcha();
        } catch (error) {
            if (error instanceof Error) {
                setStatus(error.message);
            } else {
                setStatus("Erro ao enviar mensagem.");
            }

            setStatusType("erro");
            resetRecaptcha();
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

                <div className="recaptcha-wrapper" ref={recaptchaRef} />

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
