import TeachingHome from "../../../assets/images/teaching-front.jpg";
import TeachYourWay from "../../../assets/images/teach-your-way.jpg";
import InspireLearners from "../../../assets/images/inspire-learners.jpg";
import GetRewarded from "../../../assets/images/get-rewarded.jpg";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddInstructorMutation } from "../../../reducers/api/authApi";

const Teaching = () => {
  const { status } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [addInstructor] = useAddInstructorMutation();

  const handleStartCLick = async () => {
    if (!status) {
      navigate("join/instructor-login", {
        state: { from: location },
        replace: true,
      });
    }
    if (status === "Instructor") {
      navigate("/instructor");
    }
    if (status === "Student") {
      const result = await addInstructor();
      if (result?.data?.success) navigate("/instructor");
    }
  };

  return (
    <div className="bg-white text-purple-900">
      {/* Hero Section */}
      <div className="h-screen relative overflow-hidden">
        <img
          src={TeachingHome}
          alt="Teaching Hero"
          className="w-full h-full object-cover object-center brightness-75"
        />
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center px-4 sm:px-10 md:px-20 max-w-2xl">
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Come teach with us
          </p>
          <p className="py-4 text-md sm:text-lg md:text-xl text-white">
            Become an instructor and change lives - including your own
          </p>
          <button
            className="bg-purple-700 hover:bg-purple-800 transition text-white px-6 py-3 rounded-md mt-2 font-semibold text-lg w-full sm:w-auto"
            onClick={handleStartCLick}
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Reasons Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-20 bg-white text-purple-900">
        <p className="text-3xl sm:text-4xl md:text-5xl text-center font-bold pb-10">
          So many reasons to start
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Reason 1 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img
                src={TeachYourWay}
                alt="Teach Your Way"
                className="w-20 sm:w-24"
              />
            </div>
            <p className="font-bold text-xl mb-2">Teach Your Way</p>
            <p className="text-sm sm:text-base">
              Publish the course you want, in the way you want, and always have
              control of your own content.
            </p>
          </div>

          {/* Reason 2 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img
                src={InspireLearners}
                alt="Inspire Learners"
                className="w-20 sm:w-24"
              />
            </div>
            <p className="font-bold text-xl mb-2">Inspire Learners</p>
            <p className="text-sm sm:text-base">
              Teach what you know and help learners explore their interests,
              gain new skills, and advance their careers.
            </p>
          </div>

          {/* Reason 3 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img
                src={GetRewarded}
                alt="Get Rewarded"
                className="w-20 sm:w-24"
              />
            </div>
            <p className="font-bold text-xl mb-2">Get Rewarded</p>
            <p className="text-sm sm:text-base">
              Expand your professional network, build your expertise, and earn
              money on each paid enrollment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teaching;
