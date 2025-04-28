import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function CourseDetails() {
  const navigate = useNavigate();

  const handlePurchase = () => {
    const toastId = toast.loading("Processing payment...");

    setTimeout(() => {
      toast.success("Payment successful!", { id: toastId });
      navigate("/course/1/learn");
    }, 2000);
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

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-10">
        <div>
          <p className="text-gray-500 text-sm mb-1">Development 🢒 Java</p>
          <h2 className="text-2xl font-bold text-black mb-2">
            Java for Beginners
          </h2>
          <p className="text-yellow-500 text-sm font-medium mb-2">
            Best Seller
          </p>
          <div className="text-sm text-gray-700 mb-1">
            Created by Harshit Shinde
          </div>
          <div className="text-sm text-gray-700 mb-4">
            Last updated: April 6, 2025
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">What you’ll learn</h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>Understand Java syntax and structure</li>
              <li>Build console-based Java applications</li>
              <li>Master object-oriented programming</li>
              <li>Get started with basic data structures</li>
            </ul>
          </div>
        </div>

        <div className="border border-gray-300 p-6 rounded-lg shadow-md">
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
          </ul>
        </div>
      </div>
    </div>
  );
}
