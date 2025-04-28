import { Link, useParams } from "react-router-dom";
import { useEnrollStudentQuery } from "../../../reducers/api/paymentApi";
import Spinner from "../../../components/Spinner";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Success = () => {
  const { sessionId } = useParams();
  const { data, isLoading } = useEnrollStudentQuery(sessionId);

  useEffect(() => {
    if (data?.success) {
      toast.success("Enrollment successful! 🎉");
    } else if (data && !data.success) {
      toast.error("Enrollment failed. Please try again.");
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-purple-900 p-4">
      <div className="max-w-xl w-full border border-purple-700 p-6 rounded-lg shadow-lg text-center">
        <p className="text-2xl font-semibold mb-8">
          {data?.success
            ? "You have successfully enrolled in this course!"
            : "An error occurred during enrollment."}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 text-lg">
          <Link
            to="/user/courses"
            className="bg-purple-700 text-white py-3 px-6 rounded hover:bg-purple-800 transition"
          >
            View Purchased Courses
          </Link>
          <Link
            to="/"
            className="border border-purple-700 text-purple-700 py-3 px-6 rounded hover:bg-purple-100 transition"
          >
            Browse Other Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
