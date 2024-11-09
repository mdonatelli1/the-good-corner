import { LoginQuery, useLoginLazyQuery } from "@/generated/graphql-types";
import { useForm } from "react-hook-form";

type user = {
    email: string;
    password: string;
};

export default function Login() {
    const { register, handleSubmit } = useForm<user>();
    const [sendLoginQuery, { loading, error }] = useLoginLazyQuery({
        onCompleted: (data: LoginQuery) => {
            if (data.login) {
                const token: string = data.login;
                localStorage.setItem("authToken", token);
                window.location.reload();
            }
        },
    });

    return (
        <form
            onSubmit={handleSubmit(async (formData: user) => {
                sendLoginQuery({
                    variables: formData,
                });
            })}
        >
            <label>
                Email : <br />
                <input
                    className="text-field"
                    type="email"
                    {...register("email", { required: true })}
                />
            </label>
            <br />
            <label>
                Mot de passe : <br />
                <input
                    className="text-field"
                    type="password"
                    {...register("password", {
                        required: true,
                    })}
                />
            </label>
            <br />
            {loading ? <p>Loading...</p> : error && <p>{error.message}</p>}
            <button className="button">Se connecter</button>
        </form>
    );
}
