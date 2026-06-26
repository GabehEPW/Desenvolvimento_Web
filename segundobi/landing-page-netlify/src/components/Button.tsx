import "../styles/button.css";

interface ButtonProps {
    text: string;
    secondary?: boolean;
    href?: string;
    type?: "button" | "submit" | "reset";
}

export default function Button({ text, secondary, href, type = "button" }: ButtonProps) {
    const className = secondary ? "btn-secondary" : "btn-primary";

    if (href) {
        return (
            <a className={className} href={href}>
                {text}
            </a>
        );
    }

    return (
        <button className={className} type={type}>
            {text}
        </button>
    );
}