import { useSearchCoursesQuery } from "../../../reducers/api/courseApi";
import { useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import WideCourseCard from "./WideCourseCard";

const SearchCourses = () => {
  const params = useParams();
  const { query } = params;
  const { data, isLoading } = useSearchCoursesQuery(query);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-white text-purple-900 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 py-10">
      <div className="mb-6">
        <p className="text-2xl font-semibold text-center sm:text-left">
          {data?.courses.length} result{data?.courses.length !== 1 && "s"} for "
          <span className="text-purple-700 font-bold">{query}</span>"
        </p>
      </div>
      <div className="space-y-6">
        {data?.courses.map((course) => (
          <WideCourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default SearchCourses;
