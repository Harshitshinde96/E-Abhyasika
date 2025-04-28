import { useGetCategoryCoursesQuery } from "../../../reducers/api/courseApi";
import Spinner from "../../../components/Spinner";
import CourseCard from "./CourseCard";
import { motion } from "framer-motion";

const Section = () => {
  const { data, isLoading } = useGetCategoryCoursesQuery("Development");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Spinner />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      {data?.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </motion.div>
  );
};

export default Section;
