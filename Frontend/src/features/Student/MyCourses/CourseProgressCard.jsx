// import { Link } from "react-router-dom";

// const CourseProgressCard = ({ course }) => {
//   let progressVid = 0;
//   let total = 0;

//   course.courseId.courseContent.forEach((section) => {
//     section.subSection.forEach((subsection) => {
//       if (course.completedVideos.includes(subsection._id)) {
//         progressVid++;
//       }
//       total++;
//     });
//   });

//   let progress = 0;
//   if (total > 0) {
//     progress = progressVid / total;
//   }

//   return (
//     <Link
//       to={`/course/${course._id}`}
//       className="w-full sm:w-60 border border-black rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
//     >
//       <img
//         src={course.courseId.previewImage}
//         alt={course.courseId.courseName}
//         className="w-full h-36 object-cover"
//       />
//       <div className="p-2">
//         <p className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white truncate">
//           {course.courseId.courseName}
//         </p>
//         <div className="flex items-center gap-x-2 mt-2">
//           <progress
//             value={progress}
//             max="1"
//             className="w-full h-2 rounded overflow-hidden"
//           />
//           <span className="text-sm text-gray-600 dark:text-gray-300">
//             {(progress * 100).toFixed(0)}%
//           </span>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default CourseProgressCard;
import { Link } from "react-router-dom";

const CourseProgressCard = ({ course }) => {
  const { _id, courseTitle, thumbnail, totalLectures, completedLectures } =
    course;

  const progress = totalLectures > 0 ? completedLectures / totalLectures : 0;

  return (
    <Link
      to={`/course/${_id}`}
      className="w-full sm:w-60 border border-black rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={thumbnail}
        alt={courseTitle}
        className="w-full h-36 object-cover"
      />
      <div className="p-2">
        <p className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white truncate">
          {courseTitle}
        </p>
        <div className="flex items-center gap-x-2 mt-2">
          <progress
            value={progress}
            max="1"
            className="w-full h-2 rounded overflow-hidden"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {(progress * 100).toFixed(0)}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseProgressCard;
