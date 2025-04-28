import { Link, Outlet } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useGetUserDetailsQuery } from "../../../reducers/api/userApi";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const ProfileLayout = () => {
  const { isLoading } = useGetUserDetailsQuery();
  const { isInstructor } = useAuth();

  if (isLoading) return <Spinner />;

  const handleLinkClick = (section) => {
    toast.success(`Navigating to ${section} settings!`);
  };

  return (
    <div className="px-4 md:px-10 py-6">
      <p className="text-3xl font-extrabold text-gray-800 mb-6">
        Profile & Settings
      </p>

      <div className="flex flex-wrap gap-6 border-b border-gray-300 pb-4">
        <Link
          to={`/${isInstructor ? "instructor" : "user"}/profile/basic-information`}
          onClick={() => handleLinkClick("Profile")}
          className="text-lg font-semibold text-gray-700 hover:text-purple-600 transition"
        >
          E-Abhyasika Profile
        </Link>

        <Link
          to={`/${isInstructor ? "instructor" : "user"}/profile/photo`}
          onClick={() => handleLinkClick("Profile Picture")}
          className="text-lg font-semibold text-gray-700 hover:text-purple-600 transition"
        >
          Profile Picture
        </Link>
      </div>

      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
