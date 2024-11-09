import { useRouter } from "next/router";
import { AdCardProps } from "../../components/AdCard";
import { GetAdQuery, useGetAdQuery } from "@/generated/graphql-types";

export default function AdDetailComponent() {
    const router = useRouter();

    const { data, error, loading } = useGetAdQuery({
        variables: { id: parseInt(router.query.id as string, 10) },
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error : {error.message}</p>;
    }

    const result: GetAdQuery = data!;
    let ad: AdCardProps = result.getAd!;

    if (!result || !ad) return <p>No ad found</p>;

    return (
        <>
            {ad && (
                <div className="ad-card-container">
                    <img
                        className="ad-card-image"
                        src={
                            ad.picture
                                ? ad.picture
                                : "/images/file-question.svg"
                        }
                    />
                    <div className="ad-card-text">
                        <div className="ad-card-title">{ad.title}</div>
                        <div className="ad-card-price">{ad.price} €</div>
                    </div>
                </div>
            )}
        </>
    );
}
