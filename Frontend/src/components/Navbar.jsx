import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { MdLogout } from "react-icons/md";
import { useLogoutMutation } from "../reducers/api/authApi";
import useAuth from "../hooks/useAuth";
import Logo from "../assets/main.svg";
import Search from "../assets/images/search.png";
import BlankProfile from "../assets/images/blankProfile.webp";
import { useGetUserDetailsQuery } from "../reducers/api/userApi";

function Navbar() {
  const { data: userDetails } = useGetUserDetailsQuery();
  const [logout, { isSuccess }] = useLogoutMutation();
  const navigate = useNavigate();
  const queryRef = useRef(null);
  const { isStudent, isInstructor } = useAuth();

  useEffect(() => {
    if (isSuccess) navigate("/join/login");
  }, [isSuccess, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${queryRef.current.value}`);
  };

  return (
    <div className="w-full shadow-md bg-white px-4 py-3 md:px-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      {/* Logo and Platform Name */}
      <div className="flex items-center justify-between w-full md:w-auto gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-10 h-10" />
          <span className="text-lg md:text-xl font-bold text-purple-700">
            e-Abhyasika
          </span>
        </Link>
      </div>

      {/* Categories */}
      <div className="hidden md:block text-sm font-medium text-gray-700 hover:text-purple-700">
        Categories
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:max-w-[40%] relative flex items-center"
      >
        <button type="submit" className="absolute left-3 top-2.5">
          <img src={Search} className="w-4 h-4" alt="Search icon" />
        </button>
        <input
          ref={queryRef}
          type="text"
          placeholder="Search for anything"
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
          required
        />
      </form>

      {/* Teach Link */}
      <div className="text-sm font-medium text-gray-700 hover:text-purple-700 hidden md:block">
        {isInstructor ? (
          <Link to="/instructor">Instructor</Link>
        ) : (
          <Link to="/teaching">Teach on E-Abhyasika</Link>
        )}
      </div>

      {/* Auth Area */}
      <div className="flex items-center justify-end gap-3 w-full md:w-auto">
        {isStudent ? (
          <div className="flex items-center gap-4">
            <Link
              to="/user/my-courses"
              className="text-sm text-gray-700 hover:text-purple-700 font-medium"
            >
              My Learning
            </Link>
            <Link
              to={
                isInstructor
                  ? "/instructor/profile/basic-information"
                  : "/user/profile/basic-information"
              }
            >
              <img
                src={
                  userDetails?.profilePicture
                    ? userDetails?.profilePicture
                    : BlankProfile
                }
                alt="Profile"
                className="w-8 h-8 rounded-full border object-cover"
              />
            </Link>
            <button
              type="button"
              onClick={logout}
              className="text-purple-400 hover:text-purple-700"
              title="Logout"
            >
              <MdLogout size={20} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/join/login"
              className="border border-gray-700 text-sm px-4 py-1.5 rounded-full hover:bg-gray-100 transition-all"
            >
              Log In
            </Link>
            <Link
              to="/join/signup"
              className="bg-purple-600 text-white text-sm px-4 py-1.5 rounded-full hover:bg-purple-700 transition-all"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
