import { useRef, useState } from "react";
import "../styles/testimonials.css";

type Testimonial = {
    name: string;
    role: string;
    image: string;
    rating: number;
    comment: string;
};

const testimonials: Testimonial[] = [
    {
        name: "Mark Zuckerberg",
        role: "Diretor-executivo do Facebook",
        image: "/testimonials/mark-zuckerberg.png",
        rating: 5,
        comment:
            "Quero isso para o meu Facebook. Se escolher peca fosse assim em 2004, o dormitorio ja teria virado setup gamer."
    },
    {
        name: "Stephen King",
        role: "Escritor norte-americano",
        image: "/testimonials/stephen-king.png",
        rating: 4,
        comment:
            "Montei um PC sem despertar nenhum terror cosmico. So fiquei com medo da fonte errada, mas o ComputSpace resolveu o misterio."
    },
    {
        name: "Elon Musk",
        role: "CEO da Tesla e da SpaceX",
        image: "/testimonials/elon-musk.png",
        rating: 5,
        comment:
            "O setup ficou tao rapido que quase coloquei no foguete. Faltou so perguntar se roda Minecraft em Marte."
    },
    {
        name: "Sergio Sacani",
        role: "Geofisico e youtuber brasileiro",
        image: "/testimonials/sergio-sacani.png",
        rating: 4,
        comment:
            "A compatibilidade ficou tao bem explicada que da para fazer live, corte, analise e ainda sobram dados para um cafe."
    }
];

function renderStars(rating: number) {
    return Array.from({ length: 5 }, (_, index) => (
        <span key={index} aria-hidden="true">
            {index < rating ? "★" : "☆"}
        </span>
    ));
}

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const cardRefs = useRef<Array<HTMLElement | null>>([]);

    function goToCard(index: number) {
        const nextIndex = (index + testimonials.length) % testimonials.length;

        setActiveIndex(nextIndex);
        cardRefs.current[nextIndex]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });
    }

    return (
        <section id="testimonials">
            <div className="container testimonials-content">
                <header>
                    <span>Depoimentos ficticios</span>

                    <h2>Cada cliente importa!</h2>

                    <p>
                        Comentarios em tom de meme de quem provavelmente pediria
                        uma maquina bem montada.
                    </p>
                </header>

                <div className="testimonials-shell">
                    <button
                        className="carousel-button"
                        type="button"
                        aria-label="Depoimento anterior"
                        onClick={() => goToCard(activeIndex - 1)}
                    >
                        ‹
                    </button>

                    <div className="testimonials-track">
                        {testimonials.map((testimonial, index) => (
                            <article
                                className="testimonial-card"
                                key={testimonial.name}
                                ref={(element) => {
                                    cardRefs.current[index] = element;
                                }}
                            >
                                <img src={testimonial.image} alt={testimonial.name} />

                                <p className="testimonial-comment">
                                    “{testimonial.comment}”
                                </p>

                                <div
                                    className="testimonial-rating"
                                    aria-label={`${testimonial.rating} de 5 estrelas`}
                                >
                                    {renderStars(testimonial.rating)}
                                </div>

                                <strong>{testimonial.name}</strong>

                                <small>{testimonial.role}</small>
                            </article>
                        ))}
                    </div>

                    <button
                        className="carousel-button"
                        type="button"
                        aria-label="Proximo depoimento"
                        onClick={() => goToCard(activeIndex + 1)}
                    >
                        ›
                    </button>
                </div>

                <div className="carousel-dots" aria-label="Selecionar depoimento">
                    {testimonials.map((testimonial, index) => (
                        <button
                            className={index === activeIndex ? "active" : ""}
                            key={testimonial.name}
                            type="button"
                            aria-label={`Ver depoimento de ${testimonial.name}`}
                            onClick={() => goToCard(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
