import Header from "../components/Header";
import Button from "../components/Button";
import Solutions from "../components/Solutions";

export default function Home() {
    return (
        <>
            <Header />

            <main>
                <section id="hero" className="container py-xl">
                    <div className="hero-content">
                        <p className="tag">Monte seu PC com inteligência</p>

                        <h2>Encontre a configuração ideal para você</h2>

                        <p>
                            O ComputSpace ajuda pessoas a escolher peças compatíveis
                            e montar computadores de forma simples, rápida e segura.
                        </p>

                        <Button text="Começar agora" href="#solution" />
                    </div>
                </section>

                <Solutions />
            </main>
        </>
    );
}