/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { CourseInfo } from "../../../utils/CourseInfo";
import { Rating } from "@smastrom/react-rating";

const WideCourseCard = ({ course }) => {
  if (!course) return null;

  const { ratingAvg, ratingLength } = CourseInfo([course]);

  // Determine the course route based on the course name
  const getCourseRoute = (courseName) => {
    if (!courseName) return '/';
    const lowerName = courseName.toLowerCase();
    if (lowerName.includes('java')) return '/course/java';
    if (lowerName.includes('python')) return '/course/python';
    if (lowerName.includes('c programming')) return '/course/c';
    return `/course/${course._id || ''}`;
  };

  return (
    <Link
      to={getCourseRoute(course.courseName)}
      className="flex flex-col md:flex-row gap-4 my-6 border border-purple-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 bg-white text-purple-900"
    >
      <img
        src={course.previewImage || 'https://via.placeholder.com/240x135'}
        alt={course.courseName || 'Course Image'}
        className="w-full md:w-60 h-40 md:h-auto object-cover"
      />
      <div className="flex flex-col md:flex-row justify-between w-full p-4">
        <div className="md:w-3/4 space-y-1">
          <p className="text-lg font-bold">{course.courseName || 'Untitled Course'}</p>
          <p className="text-sm text-purple-700">{course.courseSubtitle || 'No subtitle available'}</p>
          <p className="text-sm">
            {course.instructor?.firstName || ''} {course.instructor?.lastName || ''}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-purple-800">{ratingAvg.toFixed(1)}</span>
            <Rating readOnly value={ratingAvg} className="w-20" />
            <span className="text-sm text-gray-500">({ratingLength})</span>
          </div>
          <p className="text-xs text-purple-600">
            {course.instructionalLevel || 'Beginner'} Level
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:py-4 md:pr-4 font-bold text-xl text-right text-purple-700">
          {course.price === 0 ? "FREE" : `₹ ${course.price}`}
        </div>
      </div>
    </Link>
  );
};

export default WideCourseCard;
