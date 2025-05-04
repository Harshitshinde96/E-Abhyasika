import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function PythonCourseDetails({ course }) {
  const navigate = useNavigate();

  const handlePurchase = () => {
    const toastId = toast.loading("Processing payment...");

    setTimeout(() => {
      toast.success("Payment successful!", { id: toastId });
      navigate("/course/python/learn");
    }, 2000);
  };

  const details = {
    description: "Python is a versatile, high-level programming language known for its simplicity and readability, used in web development, data science, and automation.",
    prerequisites: ["Basic computer skills", "No prior programming experience required"],
    tools: ["Python 3.x", "PyCharm", "VS Code"],
    projects: ["Web Scraper", "Data Analysis Tool", "Automation Scripts"],
    features: [
      "Learn Python from scratch",
      "Build real-world applications",
      "Master data structures and algorithms",
      "Understand object-oriented programming",
      "Work with Python libraries and frameworks"
    ]
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <header className="flex items-center justify-between border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-black">e-Abhyasika</h1>
        <nav className="flex gap-4 text-sm text-gray-700">
          <span>Categories</span>
          <span>Instructor</span>
          <span>My Learning</span>
          <span>Profile</span>
        </nav>
      </header>

      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-10">
          {/* Course Information */}
          <div>
            <p className="text-gray-500 text-sm mb-1">Development 🢒 Python</p>
            <h2 className="text-2xl font-bold text-black mb-2">Python Programming Fundamentals</h2>
            <p className="text-yellow-500 text-sm font-medium mb-2">Best Seller</p>
            <div className="text-sm text-gray-700 mb-1">
              Created by Harshit Shinde
            </div>
            <div className="text-sm text-gray-700 mb-4">
              Last updated: April 6, 2025
            </div>

            {/* Course Description */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">About This Course</h3>
              <p className="text-gray-600">{details.description}</p>
            </div>

            {/* Course Features */}
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <h3 className="text-lg font-semibold mb-2">Course Features</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {details.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Prerequisites */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {details.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>

            {/* Tools & Software */}
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <h3 className="text-lg font-semibold mb-2">Tools & Software</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {details.tools.map((tool, index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Hands-on Projects</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {details.projects.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Purchase Section */}
          <div className="border border-gray-300 p-6 rounded-lg shadow-md h-fit">
            <p className="text-xl font-bold text-black mb-4">FREE</p>
            <button
              onClick={handlePurchase}
              className="w-full px-5 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-200 mb-4"
            >
              Buy Now
            </button>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>0 mins on-demand video</li>
              <li>Certificate of completion</li>
              <li>Lifetime access</li>
              <li>Downloadable resources</li>
              <li>Exercises and quizzes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 