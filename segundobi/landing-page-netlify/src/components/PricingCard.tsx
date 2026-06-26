import Button from "./Button";

interface PricingCardProps {
    title: string;
    price: string;
    features: string[];
    highlighted?: boolean;
}

export default function PricingCard({ title, price, features, highlighted }: PricingCardProps) {
    return (
        <div className={highlighted ? "pricing-card highlighted" : "pricing-card"}>
            <h3>{title}</h3>

            <strong>{price}</strong>

            <ul>
                {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                ))}
            </ul>

            <Button text="Escolher plano" href="#contact" />
        </div>
    );
}