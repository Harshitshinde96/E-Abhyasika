import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import BlankProfile from "../../../assets/images/blankProfile.webp";
import { useGetInstructorDetailsQuery } from "../../../reducers/api/courseApi";
import imagePlaceholder from "../../../assets/images/imagePlaceholder.jpg";

const Dashboard = () => {
  const { data, isLoading } = useGetInstructorDetailsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  const profilePicture = data?.profilePicture;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Top Right Profile and Student Link */}
      <div className="flex justify-end items-center gap-4 p-4 sm:px-8">
        <Link to="/" className="text-sm sm:text-base text-gray-800 hover:text-purple-700">
          Student
        </Link>
        <Link to="/instructor/profile/basic-information">
          <img
            src={profilePicture ? profilePicture : BlankProfile}
            alt="Profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border object-cover"
          />
        </Link>
      </div>

      {/* Course Creation Prompt */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white mx-4 sm:mx-16 my-6 sm:my-10 p-6 sm:p-10 rounded-lg shadow shadow-slate-300">
        <p className="text-lg sm:text-xl font-bold text-center sm:text-left mb-4 sm:mb-0">
          Jump into Course Creation
        </p>
        <Link
          to="/course/create"
          className="bg-fuchsia-600 text-white font-semibold py-2 px-6 sm:px-12 rounded hover:bg-fuchsia-700 transition-all"
        >
          Create Your Course
        </Link>
      </div>

      {/* Courses Section */}
      <div className="px-4 sm:px-16">
        {data?.courses.length > 0 && (
          <p className="py-4 text-xl sm:text-2xl font-bold">Your Courses</p>
        )}

        <div className="grid grid-cols-1 gap-6">
          {data?.courses?.map((course) => (
            <div
              key={course._id}
              className="flex flex-col sm:flex-row border rounded-lg bg-white p-4 gap-4 shadow-sm"
            >
              <img
                src={course?.previewImage ? course?.previewImage : imagePlaceholder}
                alt="Course Preview"
                className="w-full sm:w-36 h-28 object-cover rounded"
              />
              <div className="flex justify-between w-full items-center">
                <div>
                  <p className="text-base sm:text-lg font-bold">{course.courseName}</p>
                  <p className="text-sm text-gray-600 font-semibold mt-1">{course.status}</p>
                </div>
                <Link
                  to={`course/${course._id}/manage/goals`}
                  className="text-purple-600 font-bold hover:underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
