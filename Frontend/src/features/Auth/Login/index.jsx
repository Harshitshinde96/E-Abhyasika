import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../reducers/api/authApi";
import { setCredentials } from "../../../reducers/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const { register, handleSubmit } = useForm();
  let from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const result = await login({ ...data }).unwrap();
    if (result.success) {
      dispatch(setCredentials(result.accessToken));
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Log in to your{" "}
          <span className="text-purple-600 font-bold">E-Abhyasika</span> Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-600"
            {...register("password", { required: true })}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 py-3 bg-purple-700 hover:bg-purple-800 transition-colors text-white font-semibold rounded-lg"
        >
          Log In
        </button>
      </form>

      <div className="mt-6 space-y-2 text-center text-sm text-gray-600">
        <p>
          New to E-Abhyasika?{" "}
          <Link
            to="/join/signup"
            className="text-purple-700 font-medium hover:underline"
          >
            Sign up here
          </Link>
        </p>
        <p>
          <Link to="/" className="hover:underline">
            Go back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
