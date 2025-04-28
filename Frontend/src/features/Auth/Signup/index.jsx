/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../../../reducers/api/authApi";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ roles }) => {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const result = await signup({ roles, ...data }).unwrap();
    if (result.success) {
      navigate("/join/login", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-6 shadow-xl rounded-xl border border-gray-200 transition-all duration-300"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Become a <span className="text-purple-600">E-Abhyasika</span>{" "}
          Instructor
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Discover a supportive community of online instructors. Get instant
          access to all course creation resources.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            {...register("fullName", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition-all duration-300"
        >
          Sign Up
        </button>
      </form>

      <Link
        to="/join/login"
        className="mt-4 text-sm text-purple-700 hover:underline transition duration-200"
      >
        Already have an account? Log in
      </Link>
    </div>
  );
};

export default Signup;
