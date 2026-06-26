interface SolutionCardProps {
    icon: string;
    title: string;
    description: string;
}

export default function SolutionCard({ icon, title, description }: SolutionCardProps) {
    return (
        <div className="solution-card">
            <span className="solution-icon">{icon}</span>

            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <hr />
            </div>
        </div>
    );
}