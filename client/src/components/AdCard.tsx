export type AdCardProps = {
    id: string;
    title: string;
    description?: string | null;
    price?: number | null;
    picture?: string | null;
};

export default function AdCard({ title, picture, price, id }: AdCardProps) {
    return (
        <div className="ad-card-container">
            <a className="ad-card-link" href={`ads/${id}`}>
                <img
                    className="ad-card-image"
                    src={picture ? picture : "/images/file-question.svg"}
                />
                <div className="ad-card-text">
                    <div className="ad-card-title">{title}</div>
                    <div className="ad-card-price">{price} €</div>
                </div>
            </a>
        </div>
    );
}
