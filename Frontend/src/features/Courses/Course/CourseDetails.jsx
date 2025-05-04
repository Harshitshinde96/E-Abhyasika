import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function CourseDetails() {
  const navigate = useNavigate();

  // Mock course data for Java
  const course = {
    title: "Java for Beginners",
    language: "Java",
    instructor: "Harshit Shinde",
    lastUpdated: "2024-03-15",
    learningPoints: [
      "Master Java programming fundamentals",
      "Understand object-oriented programming concepts",
      "Build real-world applications",
      "Learn best practices and coding standards",
      "Prepare for Java certification"
    ],
    price: 0
  };

  const handlePurchase = () => {
    const toastId = toast.loading("Processing payment...");

    setTimeout(() => {
      toast.success("Payment successful!", { id: toastId });
      navigate("/course/java/learn");
    }, 2000);
  };

  // Language-specific course details
  const languageDetails = {
    java: {
      description: "Java is a powerful, object-oriented programming language used for building enterprise-level applications, Android apps, and web services.",
      prerequisites: ["Basic understanding of programming concepts", "No prior Java knowledge required"],
      tools: ["JDK", "IntelliJ IDEA", "Eclipse"],
      projects: ["Console Calculator", "Student Management System", "Banking Application"]
    },
    python: {
      description: "Python is a versatile, high-level programming language known for its simplicity and readability, used in web development, data science, and automation.",
      prerequisites: ["Basic computer skills", "No prior programming experience required"],
      tools: ["Python 3.x", "PyCharm", "VS Code"],
      projects: ["Web Scraper", "Data Analysis Tool", "Automation Scripts"]
    },
    c: {
      description: "C is a foundational programming language that provides low-level access to memory and system resources, essential for system programming and embedded systems.",
      prerequisites: ["Basic understanding of computer architecture", "No prior C knowledge required"],
      tools: ["GCC", "Code::Blocks", "Visual Studio"],
      projects: ["File System", "Memory Manager", "Basic OS Components"]
    }
  };

  const details = languageDetails.java;

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
            <p className="text-gray-500 text-sm mb-1">Development 🢒 {course.language}</p>
            <h2 className="text-2xl font-bold text-black mb-2">{course.title}</h2>
            <p className="text-yellow-500 text-sm font-medium mb-2">Best Seller</p>
            <div className="text-sm text-gray-700 mb-1">
              Created by {course.instructor}
            </div>
            <div className="text-sm text-gray-700 mb-4">
              Last updated: {course.lastUpdated}
            </div>

            {/* Course Description */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">About This Course</h3>
              <p className="text-gray-600">{details.description}</p>
            </div>

            {/* What You'll Learn */}
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <h3 className="text-lg font-semibold mb-2">What you'll learn</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {course.learningPoints.map((point, index) => (
                  <li key={index}>{point}</li>
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

            {/* Tools */}
            <div className="bg-gray-100 p-4 rounded-md mb-6">
              <h3 className="text-lg font-semibold mb-2">Tools & Technologies</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {details.tools.map((tool, index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">Projects You'll Build</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {details.projects.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Course Card */}
          <div className="bg-white border rounded-lg shadow-lg p-6 h-fit sticky top-4">
            <img
              src="https://example.com/java-course.jpg"
              alt="Java Course"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-black">
                {course.price === 0 ? "FREE" : `₹ ${course.price}`}
              </span>
              <span className="text-sm text-gray-500">Best Value</span>
            </div>
            <button
              onClick={handlePurchase}
              className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
            >
              Buy Now
            </button>
            <p className="text-center text-sm text-gray-500 mt-2">
              30-Day Money-Back Guarantee
            </p>
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold">This Course Includes:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ 30 hours of video content</li>
                <li>✓ 100+ coding exercises</li>
                <li>✓ Downloadable resources</li>
                <li>✓ Certificate of completion</li>
                <li>✓ Lifetime access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 