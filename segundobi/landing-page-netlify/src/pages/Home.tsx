import Header from "../components/Header";
import Button from "../components/Button";
import Solutions from "../components/Solutions";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <>
            <Header />

            <main>
                {/* Hero principal da pagina. */}
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

                <Testimonials />

                <Pricing />

                {/* Formulario de contato e envio da demo. */}
                <ContactForm />
            </main>

            <Footer />
        </>
    );
}
