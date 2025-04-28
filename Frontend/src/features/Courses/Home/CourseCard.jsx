/* eslint-disable react/prop-types */
import { CourseInfo } from "../../../utils/CourseInfo";
import { Link } from "react-router-dom";
import { Rating, ThinStar } from "@smastrom/react-rating";

const ratingStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#cfb700",
  inactiveFillColor: "#fbf1a9",
};

const CourseCard = ({ course }) => {
  const { ratingAvg, ratingLength } = CourseInfo([course]);

  return (
    <div
      key={course?._id}
      className="bg-white dark:bg-[#1e1e2f] border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    >
      <Link to={`course/${course._id}`} className="block p-4">
        <img
          src={course?.previewImage}
          alt={course?.courseName}
          className="w-full h-40 object-cover rounded-md mb-3 border border-purple-400"
        />
        <p className="font-bold text-lg text-[#4b0082] dark:text-purple-300 leading-5">
          {course?.courseName}
        </p>
        <p className="text-sm text-gray-600 dark:text-purple-200 mt-1">
          {course?.instructor?.firstName} {course?.instructor?.lastName}
        </p>

        <div className="flex items-center gap-x-2 mt-2">
          <span className="text-sm font-bold text-[#4b0082] dark:text-purple-200">
            {ratingAvg}
          </span>
          <Rating
            readOnly
            className="w-1/3"
            value={ratingAvg}
            itemStyles={ratingStyles}
          />
          <p className="text-sm text-gray-500 dark:text-purple-300">
            ({ratingLength})
          </p>
        </div>

        <p className="mt-2 font-semibold text-[#4b0082] dark:text-purple-300">
          {course?.price > 0 ? "₹ " + course?.price : "FREE"}
        </p>
      </Link>
    </div>
  );
};

export default CourseCard;
