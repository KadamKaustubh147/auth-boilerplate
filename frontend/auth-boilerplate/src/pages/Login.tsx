import { Link, useNavigate } from "react-router-dom";
import sideImg from "../assets/side.jpg?format=webp";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext-http-jwt"; // ✅ FIXED
import type { FormEvent } from "react";
import { useGoogleLogin } from "@react-oauth/google";


const Login = () => {
    const { login, googleLogin } = useContext(AuthContext)!; // ✅ non-null since you know it will be provided
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await login(email, password);

        if (success) {
            navigate('/app')
        } else {
            console.log("FAIL");
        }
    };
    const googleLoginButton = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (codeResponse) => {
            console.log(codeResponse); // Will contain `code`
            await googleLogin(codeResponse.code);
            navigate("/app");
        },
        onError: () => console.log("Google Login Failed"),
    });

    return (
        <div className="w-full flex bg-black h-[100vh]">
            {/* login container left side */}
            <div className="w-full md:w-3/5 h-full flex items-center justify-center">
                <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-black">
                    <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900 text-center dark:text-white">
                            Login to [platform]
                        </h5>

                        <button
                            type="button"
                            onClick={() => googleLoginButton()}
                            className="w-full mb-4 px-4 py-2 bg-[#8f34c2] text-white rounded"
                        >
                            Login with Google 🚀
                        </button>

                        {/* OR Line Separator */}
                        <div className="flex items-center my-4">
                            <div className="flex-grow h-px bg-gray-500"></div>
                            <span className="mx-2 text-gray-400 text-sm">or</span>
                            <div className="flex-grow h-px bg-gray-500"></div>
                        </div>

                        {/* line or wali cheez */}

                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                id="email"
                                className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[#1c1d21] dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your password
                            </label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-[#1c1d21] block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-start"></div>
                            <Link
                                to="/forgot"
                                className="ms-auto text-sm text-[#8f34c2] hover:underline "
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-[#8f34c2] hover:bg-[#762ba1]  cursor-pointer focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Login to your account
                        </button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?{" "}
                            <Link
                                to="/register"
                                className=" text-[#8f34c2] hover:underline "
                            >
                                Create account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right side image */}
            <div className="w-2/5 hidden md:block">
                <div
                    className="w-full h-full bg-cover bg-bottom"
                    style={{ backgroundImage: `url(${sideImg})` }}
                />
            </div>
        </div>
    );
};

export default Login;
