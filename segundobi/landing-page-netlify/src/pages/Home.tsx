export default function Home() {
    return (
        <>
            <header className="container py-sm">
                <nav className="flex items-center justify-between">
                    <h1 className="logo">ComputSpace</h1>

                    <ul className="flex gap-1">
                        <li>
                            <a href="#hero">Início</a>
                        </li>
                        <li>
                            <a href="#pricing">Preços</a>
                        </li>
                        <li>
                            <a href="#contact">Contato</a>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                <section id="hero" className="container py-xl">
                    <div className="hero-content">
                        <p className="tag">Monte seu PC com inteligência</p>

                        <h2>Encontre a configuração ideal para você</h2>

                        <p>
                            O ComputSpace ajuda pessoas a escolher peças compatíveis
                            e montar computadores de forma simples, rápida e segura.
                        </p>

                        <a href="#contact" className="btn-primary">
                            Começar agora
                        </a>
                    </div>
                </section>
            </main>
        </>
    );
}