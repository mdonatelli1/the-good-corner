import {
    GetAllCategoriesQuery,
    useGetAllCategoriesQuery,
    usePublishAdMutation,
} from "@/generated/graphql-types";
import { useForm } from "react-hook-form";

type category = {
    id: string;
    name: string;
};

type createAdFormData = {
    title: string;
    price: number;
    category: string;
};

export default function newAd() {
    const { register, handleSubmit } = useForm<createAdFormData>();
    const {
        data: categoriesData,
        loading: categoriesLoading,
        error: categoriesError,
    } = useGetAllCategoriesQuery();
    const [publishAd] = usePublishAdMutation();

    if (categoriesLoading) {
        return <p>Loading...</p>;
    }

    if (categoriesError) {
        return <p>Error : {categoriesError.message}</p>;
    }

    const result: GetAllCategoriesQuery = categoriesData!;
    let categories: category[] = [...result.getAllCategories];

    return (
        <form
            onSubmit={handleSubmit(async (formData: createAdFormData) => {
                await publishAd({
                    variables: {
                        title: formData.title,
                        price: formData.price,
                        category: formData.category,
                    },
                });
            })}
        >
            <label>
                Titre de l'annonce : <br />
                <input
                    className="text-field"
                    type="text"
                    {...register("title", { required: true })}
                />
            </label>
            <br />
            <label>
                Prix : <br />
                <input
                    className="text-field"
                    type="number"
                    {...register("price", {
                        required: true,
                        valueAsNumber: true,
                        min: 1,
                        max: 1000,
                    })}
                />
            </label>
            <br />
            <select {...register("category")}>
                <option value="">----------</option>
                {categories.map((category) => (
                    <option value={category.name} key={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <button className="button">Submit</button>
        </form>
    );
}
