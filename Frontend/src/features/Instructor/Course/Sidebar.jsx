import { Link, useParams } from "react-router-dom";
import { DashboardLinks } from "../../../data/dashoard-links";

const Sidebar = () => {
  const { courseId } = useParams();

  if (!courseId) {
    return <p className="text-red-600 font-semibold">Course ID not found</p>;
  }

  return (
    <div className="w-full sm:w-1/4 md:w-1/5 px-4 sm:px-6 py-4 rounded-lg bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white shadow-md">
      {DashboardLinks.map((ele, i) => (
        <div key={i} className="mt-6">
          <p className="text-lg font-bold text-white mb-2">{ele.title}</p>
          <div className="space-y-1">
            {ele.sublinks.map((subtitle, index) => (
              <div
                key={index}
                className="p-2 rounded hover:bg-blue-900 transition-colors duration-200"
              >
                <Link
                  to={`/instructor/course/${courseId}/manage/${subtitle.link}`}
                  className="text-sm sm:text-base text-white hover:text-yellow-400 transition"
                >
                  {subtitle.subtitle}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
