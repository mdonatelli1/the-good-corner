import { useState } from "react";

import AdCard, { AdCardProps } from "./AdCard";
import { GetAllAdsQuery, useGetAllAdsQuery } from "@/generated/graphql-types";

export default function RecentAds() {
    const [total, setTotal] = useState(0);
    const { data, loading, error } = useGetAllAdsQuery();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error : {error.message}</p>;
    }

    const result: GetAllAdsQuery = data!;
    let ads: AdCardProps[] = [...result.getAllAds];

    return (
        <>
            <h2>Annonces récentes</h2>
            <p>Prix total : {total} €</p>
            <section className="recent-ads">
                {ads.map((ad: AdCardProps, index: number) => (
                    <div key={index}>
                        <AdCard
                            title={ad.title}
                            picture={ad.picture}
                            price={ad.price}
                            id={ad.id}
                        />
                        <button
                            className="button"
                            onClick={() => {
                                ad.price && setTotal(total + ad.price);
                            }}
                        >
                            Add price to total
                        </button>
                    </div>
                ))}
            </section>
        </>
    );
}
