import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../../store/authSlice.js";
import { Button, Input } from "../components/index.jsx";
import authService from "../appwrite/auth.js";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      // Create account with name, email, password
      const user = await authService.createAccount(data);
      if (user) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(authLogin(currentUser));
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-5 text-gray-800">
          Create Your Account
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit(create)} className="space-y-4">
          {/* Full Name */}
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            {...register("fullName", { required: true })}
          />

          {/* Email */}
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Sign Up
          </Button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
