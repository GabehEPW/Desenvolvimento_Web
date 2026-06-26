import "../styles/button.css";

interface ButtonProps {
    text: string;
    secondary?: boolean;
    href?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export default function Button({ text, secondary, href, type = "button", disabled }: ButtonProps) {
    const className = secondary ? "btn-secondary" : "btn-primary";

    // Vira link quando recebe href e botao quando recebe type.
    if (href) {
        return (
            <a className={className} href={href}>
                {text}
            </a>
        );
    }

    return (
        <button className={className} type={type} disabled={disabled}>
            {text}
        </button>
    );
}