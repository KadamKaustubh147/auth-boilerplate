import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from '../AxiosInstance'
import sideImg from "../assets/side.jpg?format=webp";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("accounts/users/", {
        name,
        email: email,
        password: password,
        re_password: confirmPassword,
      });

      if (response.status === 201) {
        setMessage("Verification email sent. Please check your inbox to activate your account.");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error: any) {
      if (error.response) {
        const data = error.response.data;
        const errorText = Object.entries(data)
          .map(([key, val]) => `${key}: ${val}`)
          .join(", ");
        setMessage(errorText);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex bg-black h-[100vh]">
      {/* Left side */}
      <div className="w-full md:w-3/5 h-full flex items-center justify-center">
        <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-black">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 text-center dark:text-white">
              Sign up to [platform]
            </h5>

            {/* Google button - same as yours */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 text-black bg-white border-gray-400 border-[1.5px] cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-[#e6e6e6]"
            >
              {/* your SVG here */}
              <svg className="w-4 h-4" viewBox="0 0 533.5 544.3">
                <path fill="#4285f4" d="M533.5 278.4c0-17.4-1.5-34.2-4.3-50.6H272v95.8h147.1c-6.3 34-25 62.9-53.4 82.2v68h86.1c50.5-46.5 81.7-115.1 81.7-195.4z" />
                <path fill="#34a853" d="M272 544.3c72.8 0 133.8-24.1 178.4-65.3l-86.1-68c-24 16.1-54.8 25.6-92.3 25.6-71 0-131.3-47.9-152.8-112.2H31.4v70.7c44.8 88.7 137.1 149.2 240.6 149.2z" />
                <path fill="#fbbc04" d="M119.2 324.4c-10.2-30-10.2-62.4 0-92.4V161.3H31.4c-43.1 86.2-43.1 188.2 0 274.4l87.8-68.2z" />
                <path fill="#ea4335" d="M272 107.2c39.6-.6 77.8 13.6 107.1 38.9l80-80C407.5 23.6 341.3 0 272 0 168.5 0 76.2 60.5 31.4 148.8l87.8 68.2c21.5-64.3 81.8-112.2 152.8-112.2z" />
              </svg>
              Sign up with Google
            </button>

            {/* OR separator */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-500"></div>
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <div className="flex-grow h-px bg-gray-500"></div>
            </div>

            {/* Inputs */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[#1c1d21] dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Jon Snow"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[#1c1d21] dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-[#1c1d21] block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-[#1c1d21] block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            {/* Message */}
            {message && (
              <div className="text-sm text-center text-red-500 dark:text-red-400">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-[#8f34c2] hover:bg-[#762ba1] cursor-pointer focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className=" text-[#8f34c2] hover:underline ">
                Login
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

export default SignUp;
