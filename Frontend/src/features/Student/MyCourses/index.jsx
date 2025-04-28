import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { useGetUserDetailsQuery } from "../../../reducers/api/userApi";
import CourseProgressCard from "./CourseProgressCard";

const MyCourses = () => {
  const { data, isLoading } = useGetUserDetailsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="w-full bg-black text-white font-bold text-3xl sm:text-4xl text-center py-10">
        <p>My Courses</p>
      </div>

      {/* Conditional rendering */}
      {!data?.courseProgress.length ? (
        <div className="flex justify-center mt-12 px-4">
          <Link
            to="/"
            className="text-center text-lg sm:text-xl font-semibold border border-black px-6 py-3 rounded hover:bg-gray-100 transition-all"
          >
            Browse New Courses
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 sm:px-8 py-10">
          {data?.courseProgress.map((course) => (
            <CourseProgressCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
