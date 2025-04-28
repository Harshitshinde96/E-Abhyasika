import { memo } from "react";
import LearningObjectives from "./LearningObjectives";
import Prerequisites from "./Prerequisites";

const CourseGoals = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-black shadow-md rounded-md w-full">
      <p className="text-2xl sm:text-3xl font-bold pb-5 border-b-2 border-red-500 text-black dark:text-white">
        Intended Learners
      </p>

      <div className="mt-4 text-gray-700 dark:text-gray-300 text-base sm:text-lg">
        <p className="mb-6">
          The following descriptions will be publicly visible on your Course Landing Page and will have a direct impact on your course performance. These descriptions will help learners decide if your course is right for them.
        </p>

        {/* Course goals and requirements components */}
        <div className="space-y-6">
          <LearningObjectives />
          <Prerequisites />
        </div>
      </div>
    </div>
  );
};

// Prevent unnecessary re-renders
export default memo(CourseGoals);
