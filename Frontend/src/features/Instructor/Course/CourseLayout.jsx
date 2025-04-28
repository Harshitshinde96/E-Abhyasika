import { Outlet, Link, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Spinner from "../../../components/Spinner";
import Sidebar from "./Sidebar";
import {
  useGetCourseDetailsQuery,
  usePublishCourseMutation,
} from "../../../reducers/api/courseApi";

const CourseLayout = () => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailsQuery(courseId);
  const [publishCourse, { isLoading: isPublishLoading }] =
    usePublishCourseMutation();

  const handlePublishCourse = async () => {
    try {
      if (!courseId) return;
      await publishCourse({ courseId }).unwrap();
    } catch (err) {
      console.error("Publish failed:", err);
    }
  };

  if (isLoading || !data) return <Spinner />;

  let totalDuration = 0;
  data.courseDetails.courseContent.forEach((section) => {
    section.subSection.forEach((subsection) => {
      totalDuration += Math.round(subsection.timeDuration);
    });
  });
  totalDuration = Math.ceil(totalDuration / 60);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-4 px-4 py-4 text-white bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] shadow-md rounded">
        <div className="flex flex-wrap gap-3 items-center">
          <Link
            to="/instructor"
            className="flex items-center gap-2 text-sm sm:text-base hover:underline"
          >
            <FaChevronLeft />
            <p>Back To Courses</p>
          </Link>
          <p className="font-bold text-sm sm:text-lg">
            {data.courseDetails.courseName}
          </p>
          <p className="bg-slate-600 text-xs sm:text-sm px-2 py-1 rounded">
            {data.courseDetails.status}
          </p>
          <p className="text-xs sm:text-sm">
            {totalDuration} minutes Content Length
          </p>
        </div>

        {data.courseDetails.status !== "Published" && (
          <button
            type="button"
            disabled={isPublishLoading}
            onClick={handlePublishCourse}
            className="font-bold text-black bg-yellow-400 hover:bg-yellow-500 transition px-4 py-2 text-sm sm:text-base rounded disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPublishLoading ? "Publishing..." : "Publish"}
          </button>
        )}
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-4 my-6 px-4">
        <Sidebar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CourseLayout;
