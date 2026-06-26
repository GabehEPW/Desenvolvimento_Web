import PricingCard from "./PricingCard";
import "../styles/pricing.css";

export default function Pricing() {
    return (
        <section id="pricing" className="container">
            <header>
                {/* Intro da secao de planos. */}
                <span>Preços</span>

                <h2>Planos para montar seu PC</h2>

                <p>
                    Escolha o plano ideal para receber sugestões de peças,
                    compatibilidade e montagem de computadores.
                </p>
            </header>

            {/* Cards dos planos disponiveis. */}
            <div className="pricing-cards">
                <PricingCard
                    title="Básico"
                    price="Grátis"
                    features={[
                        "Sugestão simples de peças",
                        "Verificação básica",
                        "Ideal para iniciantes"
                    ]}
                />

                <PricingCard
                    title="Gamer"
                    price="R$ 29,90"
                    highlighted
                    features={[
                        "Montagem por orçamento",
                        "Comparação de peças",
                        "Cálculo de consumo"
                    ]}
                />

                <PricingCard
                    title="Pro"
                    price="R$ 49,90"
                    features={[
                        "Configurações avançadas",
                        "Ajuda para upgrade",
                        "Histórico de montagens"
                    ]}
                />
            </div>
        </section>
    );
}