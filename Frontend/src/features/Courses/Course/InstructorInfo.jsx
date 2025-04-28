import { useGetFullCourseDetailsQuery } from "../../../reducers/api/courseApi";
import { useParams } from "react-router-dom";
import { IoIosStar, IoMdPlayCircle } from "react-icons/io";
import { SlBadge } from "react-icons/sl";
import { MdPeople } from "react-icons/md";
import BlankProfile from "../../../assets/images/blankProfile.webp";
import { CourseInfo } from "../../../utils/CourseInfo";
import Spinner from "../../../components/Spinner";

const InstructorInfo = () => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetFullCourseDetailsQuery(courseId);
  if (isLoading) {
    return <Spinner />;
  }

  const info = data?.courseDetails.instructor;
  const { studentsEnrolled, ratingAvg, ratingLength } = CourseInfo(
    info?.courses
  );

  return (
    <div className="bg-black text-white p-6 rounded-2xl shadow-lg space-y-6 md:space-y-4">
      <p className="text-3xl font-bold text-red-500 border-b-2 border-red-600 inline-block pb-1">
        Instructor
      </p>

      <div className="space-y-1">
        <p className="text-xl font-semibold text-red-400 underline">
          {info?.firstName + " " + info?.lastName}
        </p>
        <p className="italic text-gray-400">{info?.headline}</p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={info?.profilePicture ? info.profilePicture : BlankProfile}
          alt="Instructor Profile"
          className="w-28 h-28 rounded-full border-4 border-red-500 shadow-md"
        />

        <div className="space-y-3 text-gray-300 text-sm w-full md:w-auto">
          <div className="flex items-center gap-2">
            <IoIosStar className="text-red-400 text-xl" />
            <span className="font-medium">{ratingAvg}</span>
            <span className="text-gray-400">Instructor Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <SlBadge className="text-red-400 text-lg" />
            <span className="font-medium">{ratingLength}</span>
            <span className="text-gray-400">Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <MdPeople className="text-red-400 text-xl" />
            <span className="font-medium">{studentsEnrolled}</span>
            <span className="text-gray-400">Students</span>
          </div>
          <div className="flex items-center gap-2">
            <IoMdPlayCircle className="text-red-400 text-xl" />
            <span className="font-medium">{info?.courses.length}</span>
            <span className="text-gray-400">Courses</span>
          </div>
        </div>
      </div>

      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
        {info?.biography}
      </p>
    </div>
  );
};

export default InstructorInfo;
