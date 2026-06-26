import "../styles/footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <h3>ComputSpace</h3>

                    <div className="social-links">
                        <a href="#">Instagram</a>
                        <a href="#">Facebook</a>
                        <a href="#">YouTube</a>
                    </div>
                </div>

                <div className="footer-column">
                    <h4>Empresa</h4>
                    <a href="#hero">Sobre nós</a>
                    <a href="#contact">Contato</a>
                    <a href="#pricing">Planos</a>
                </div>

                <div className="footer-column">
                    <h4>Funcionalidades</h4>
                    <a href="#solution">Montagem de PC</a>
                    <a href="#solution">Compatibilidade</a>
                    <a href="#pricing">Orçamentos</a>
                </div>

                <div className="footer-column">
                    <h4>Recursos</h4>
                    <a href="#hero">Web App</a>
                    <a href="#contact">Teste a demo</a>
                    <a href="#contact">Suporte</a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    Feito com amor na aula de Programação Web 💙 © 2026 ComputSpace - Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}