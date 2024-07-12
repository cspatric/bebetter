import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <div className="flex flex-col justify-center items-center p-5">
                <h1 className="text-3xl">
                    <strong>Login</strong>
                </h1>
                <p className="text-gray-500">
                    Ola, seja bem vindo ao seu melhor.
                </p>
            </div>
            <form
                onSubmit={submit}
                className="flex justify-center items-center flex-col"
            >
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block p-4 w-80 border-none rounded-2xl"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="Email"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block p-4 w-80 border-none rounded-2xl"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="Senha"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mr-48 mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {/* {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )} */}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Login Now
                    </PrimaryButton>
                </div>
            </form>
            <div className="flex gap-2 flex-col items-center justify-end border-separate mt-4">
                <p>Ou faça login com:</p>
                <button className="border border-gray-200 h-14 w-72 rounded-xl gap-2 text-lg flex justify-center items-center active:bg-gray-200 hover:bg-gray-100">
                    <FaFacebook className="text-3xl" />
                    Login com <strong>Facebook</strong>
                </button>
                <button className="border border-gray-200 h-14 w-72 rounded-xl gap-2 text-lg flex justify-center items-center active:bg-gray-200 hover:bg-gray-100">
                    <FaGoogle className="text-3xl" />
                    Login com <strong>Google</strong>
                </button>
            </div>
        </GuestLayout>
    );
}
