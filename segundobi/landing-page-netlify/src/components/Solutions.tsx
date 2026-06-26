import SolutionCard from "./SolutionCard";
import "../styles/solution.css";

export default function Solutions() {
    return (
        <section className="container" id="solution">
            <header>
                <span>
                    <h2>Soluções</h2>

                    <span className="desktop-only">
                        <h2>Sob medida para você</h2>
                    </span>
                </span>

                <p>
                    O <strong>ComputSpace</strong> foi pensado para ajudar pessoas
                    que querem montar ou melhorar um computador, mas não sabem por
                    onde começar.
                </p>
            </header>

            <section className="solution-cards">
                <SolutionCard
                    icon="🧩"
                    title="Peças Compatíveis"
                    description="Ajuda o usuário a entender quais peças combinam entre si na hora de montar um computador."
                />

                <SolutionCard
                    icon="⚡"
                    title="Consumo de Energia"
                    description="Mostra uma estimativa do consumo das peças para ajudar na escolha de uma fonte adequada."
                />

                <SolutionCard
                    icon="🎯"
                    title="Sugestão por Perfil"
                    description="Indica configurações com base no uso do usuário, como estudo, trabalho, jogos ou edição."
                />
            </section>
        </section>
    );
}