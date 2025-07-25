import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { HiKey } from "react-icons/hi2";
import api from "../AxiosInstance";

const PasswordReset = () => {
  const { uid, token } = useParams();
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setMessage("❌ Please fill in both fields.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    setStatus("pending");
    setMessage("");

    try {
      await api.post("/accounts/users/reset_password_confirm/", {
        uid,
        token,
        new_password: password,
        re_new_password: confirmPassword,
      });
      setStatus("success");
      setMessage("✅ Your password has been successfully reset!");
    } catch (error) {
      setStatus("error");
      setMessage("❌ Password reset link is invalid or has expired.");
    }
  };

  return (
    <div className="bg-black flex w-full h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center text-white w-full max-w-sm space-y-4 p-6 rounded-lg shadow-md">
        <div className="flex justify-center w-full">
          <HiKey className="text-4xl" />
        </div>

        {status === "idle" && (
          <>
            <h1 className="text-2xl font-semibold text-center pb-2">Reset your password</h1>
            <p className="text-center text-sm text-gray-300 mb-4">
              Enter your new password below.
            </p>

            <div className="w-full">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-[#1c1d21] block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-[#1c1d21] block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>

            {message && <p className="text-red-500 text-sm">{message}</p>}

            <button
              onClick={handleResetPassword}
              className="bg-white text-black px-4 py-2 rounded-md mt-2 hover:bg-gray-200 transition cursor-pointer w-full"
            >
              Reset Password
            </button>
          </>
        )}

        {status === "pending" && (
          <>
            <h1 className="text-2xl font-semibold text-center pb-4">Resetting password…</h1>
            <p className="text-center text-sm text-gray-300">
              Please wait while we reset your password.
            </p>
          </>
        )}

        {status !== "idle" && status !== "pending" && (
          <>
            <h1 className="text-2xl font-semibold text-center pb-4">
              {status === "success" ? "Password Reset Successful!" : "Password Reset Failed"}
            </h1>
            <p className="text-center text-sm text-gray-300">{message}</p>
            {status === "success" && (
              <p className="text-center text-sm text-gray-300">
                You can now log in with your new password.
              </p>
            )}
            <Link to="/login" className="flex items-center text-sm hover:underline">
              <MdKeyboardBackspace className="mr-1" />
              Back to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;
