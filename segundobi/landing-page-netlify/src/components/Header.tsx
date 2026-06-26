import { useEffect, useState } from "react";
import Button from "./Button";
import "../styles/header.css";

export default function Header() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Bloqueia a rolagem quando o menu mobile esta aberto.
    useEffect(() => {
        const html = document.querySelector("html");

        if (html) {
            html.style.overflow = showMobileMenu ? "hidden" : "auto";
        }

        return () => {
            if (html) {
                html.style.overflow = "auto";
            }
        };
    }, [showMobileMenu]);

    function fecharMenu() {
        setShowMobileMenu(false);
    }

    return (
        <header className="site-header">
            <nav className="container py-sm flex items-center justify-between">
                {/* Logo da marca no topo. */}
                <h1 className="logo">ComputSpace</h1>

                {/* Links visiveis no desktop. */}
                <div className="desktop-only">
                    <ul className="flex gap-1 nav-links">
                        <li>
                            <a href="#hero">Início</a>
                        </li>
                        <li>
                            <a href="#solution">Soluções</a>
                        </li>
                        <li>
                            <a href="#pricing">Preços</a>
                        </li>
                        <li>
                            <a href="#contact">Contato</a>
                        </li>
                    </ul>
                </div>

                {/* Acoes principais do desktop. */}
                <div className="desktop-only">
                    <div className="flex items-center">
                        <a className="reverse-color ml-lg" href="#login">
                            Login
                        </a>

                        <Button text="Cadastre-se" href="#contact" />
                    </div>
                </div>

                {/* Menu mobile expansivel. */}
                <div className="mobile-menu">
                    {showMobileMenu ? (
                        <div className="mobile-menu-content">
                            <div className="container flex">
                                <ul>
                                    <li>
                                        <a onClick={fecharMenu} href="#hero">
                                            Início
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={fecharMenu} href="#solution">
                                            Soluções
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={fecharMenu} href="#pricing">
                                            Preços
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={fecharMenu} href="#contact">
                                            Contato
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={fecharMenu} className="reverse-color" href="#login">
                                            Login
                                        </a>
                                    </li>
                                </ul>

                                <button
                                    className="menu-button"
                                    onClick={() => setShowMobileMenu(false)}
                                    aria-label="Fechar menu"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="menu-button"
                            onClick={() => setShowMobileMenu(true)}
                            aria-label="Abrir menu"
                        >
                            ☰
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}