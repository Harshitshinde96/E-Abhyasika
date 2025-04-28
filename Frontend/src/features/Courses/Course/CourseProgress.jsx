import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import ClaimCertificate from "./ClaimCertificate";
import { useGetFullCourseDetailsQuery } from "../../../reducers/api/courseApi";
import { useGetUserProgressQuery } from "../../../reducers/api/courseProgressApi";

const CourseProgress = () => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetFullCourseDetailsQuery(courseId);
  const { data: courseProgress } = useGetUserProgressQuery(courseId);

  if (isLoading) {
    return <Spinner />;
  }

  let totalContent = 0;
  let userContent = 0;

  data?.courseDetails.courseContent.forEach((section) => {
    section?.subSection?.forEach((subsection) => {
      if (
        courseProgress?.userProgress?.completedVideos.includes(subsection?._id)
      ) {
        userContent++;
      }
      totalContent++;
    });
  });

  const progressPercentage = Math.round((userContent / totalContent) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 p-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <p className="text-xl font-bold text-black dark:text-white mb-2">
        Course Progress
      </p>
      <div className="flex items-center gap-3">
        <progress
          value={userContent / totalContent}
          max="1"
          className="w-full h-4 accent-purple-700"
        />
        <p className="text-sm font-semibold text-black dark:text-white min-w-[50px] text-right">
          {progressPercentage}%
        </p>
      </div>

      {userContent / totalContent === 1 && (
        <div className="mt-6">
          <ClaimCertificate
            courseName={data?.courseDetails?.courseName}
            userName={
              courseProgress?.userProgress?.userId?.firstName +
              " " +
              courseProgress?.userProgress?.userId?.lastName
            }
          />
        </div>
      )}
    </div>
  );
};

export default CourseProgress;
