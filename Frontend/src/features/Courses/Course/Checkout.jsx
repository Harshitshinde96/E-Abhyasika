// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { toast } from "react-hot-toast";
// // import { CheckCircle2 } from "lucide-react";

// // export default function Checkout() {
// //   const [paymentSuccess, setPaymentSuccess] = useState(false);
// //   const navigate = useNavigate();

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const toastId = toast.loading("Processing payment...");

// //     setTimeout(() => {
// //       toast.success("Payment successful!", { id: toastId });
// //       setPaymentSuccess(true);

// //       // Optional: Navigate after a delay
// //       setTimeout(() => {
// //         navigate("/dashboard/my-courses");
// //       }, 3000);
// //     }, 2000);
// //   };

// //   if (paymentSuccess) {
// //     return (
// //       <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 py-10">
// //         <CheckCircle2 className="text-green-600 w-20 h-20 mb-4" />

// //         <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-2 text-center">
// //           Purchase Successful!
// //         </h1>

// //         <p className="text-lg text-green-700 mb-6 text-center max-w-md">
// //           Thank you for purchasing the course. You can now access it from your
// //           dashboard.
// //         </p>

// //         <button
// //           onClick={() => navigate("/dashboard/my-courses")}
// //           className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
// //         >
// //           Go to My Courses
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
// //       <button
// //         onClick={handleSubmit}
// //         className="w-full max-w-xs px-5 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-200"
// //       >
// //         Buy Now
// //       </button>
// //     </div>
// //   );
// // }
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CheckCircle2 } from "lucide-react";
// import { toast } from "react-hot-toast";

// export default function CourseDetails() {
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handlePurchase = () => {
//     const toastId = toast.loading("Processing payment...");

//     setTimeout(() => {
//       toast.success("Payment successful!", { id: toastId });
//       setPaymentSuccess(true);

//       setTimeout(() => {
//         navigate("/dashboard/my-courses");
//       }, 3000);
//     }, 2000);
//   };

//   if (paymentSuccess) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 py-10">
//         <CheckCircle2 className="text-green-600 w-20 h-20 mb-4" />
//         <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-2 text-center">
//           Purchase Successful!
//         </h1>
//         <p className="text-lg text-green-700 mb-6 text-center max-w-md">
//           Thank you for purchasing the course. You can now access it from your
//           dashboard.
//         </p>
//         <button
//           onClick={() => navigate("/dashboard/my-courses")}
//           className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
//         >
//           Go to My Courses
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white px-4 py-8">
//       {/* Header */}
//       <header className="flex items-center justify-between border-b pb-4 mb-6">
//         <h1 className="text-2xl font-bold text-black">e-Abhyasika</h1>
//         <nav className="flex gap-4 text-sm text-gray-700">
//           <span>Categories</span>
//           <span>Instructor</span>
//           <span>My Learning</span>
//           <span>Profile</span>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-10">
//         {/* Course Info */}
//         <div>
//           <p className="text-gray-500 text-sm mb-1">Development 🢒 Java</p>
//           <h2 className="text-2xl font-bold text-black mb-2">
//             Java for Beginners
//           </h2>
//           <p className="text-yellow-500 text-sm font-medium mb-2">
//             Best Seller
//           </p>

//           <div className="text-sm text-gray-700 mb-1">0 (0 ratings)</div>
//           <div className="text-sm text-gray-700 mb-1">0 students</div>
//           <div className="text-sm text-gray-700 mb-1">
//             Created by <span className="font-semibold">Harshit Shinde</span>
//           </div>
//           <div className="text-sm text-gray-700 mb-4">
//             Last updated: April 6, 2025
//           </div>

//           <div className="bg-gray-100 p-4 rounded-md">
//             <h3 className="text-lg font-semibold mb-2">What you’ll learn</h3>
//             <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
//               <li>Understand Java syntax and structure</li>
//               <li>Build console-based Java applications</li>
//               <li>Master object-oriented programming</li>
//               <li>Get started with basic data structures</li>
//             </ul>
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div className="border border-gray-300 p-6 rounded-lg shadow-md">
//           <p className="text-xl font-bold text-black mb-4">FREE</p>
//           <button
//             onClick={handlePurchase}
//             className="w-full px-5 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-200 mb-4"
//           >
//             Buy Now
//           </button>

//           <div className="text-sm text-gray-700 mb-2">
//             This course includes:
//           </div>
//           <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
//             <li>0 mins on-demand video</li>
//             <li>Certificate of completion</li>
//           </ul>

//           <div className="mt-6">
//             <h4 className="font-semibold mb-1 text-gray-800">Instructor</h4>
//             <p className="text-sm text-gray-700">Harshit Shinde</p>
//             <p className="text-xs text-gray-500 mt-1">
//               0 Instructor Rating | 0 Reviews | 0 Students | 1 Course
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CourseDetails() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePurchase = () => {
    const toastId = toast.loading("Processing payment...");

    setTimeout(() => {
      toast.success("Payment successful!", { id: toastId });
      setPaymentSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      {/* Header */}
      <header className="flex items-center justify-between border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-black">e-Abhyasika</h1>
        <nav className="flex gap-4 text-sm text-gray-700">
          <span>Categories</span>
          <span>Instructor</span>
          <span>My Learning</span>
          <span>Profile</span>
        </nav>
      </header>

      {!paymentSuccess ? (
        // Show course purchase info
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-10">
          {/* Course Info */}
          <div>
            <p className="text-gray-500 text-sm mb-1">Development 🢒 Java</p>
            <h2 className="text-2xl font-bold text-black mb-2">
              Java for Beginners
            </h2>
            <p className="text-yellow-500 text-sm font-medium mb-2">
              Best Seller
            </p>

            <div className="text-sm text-gray-700 mb-1">0 (0 ratings)</div>
            <div className="text-sm text-gray-700 mb-1">0 students</div>
            <div className="text-sm text-gray-700 mb-1">
              Created by <span className="font-semibold">Harshit Shinde</span>
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

          {/* Sidebar */}
          <div className="border border-gray-300 p-6 rounded-lg shadow-md">
            <p className="text-xl font-bold text-black mb-4">FREE</p>
            <button
              onClick={handlePurchase}
              className="w-full px-5 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-200 mb-4"
            >
              Buy Now
            </button>

            <div className="text-sm text-gray-700 mb-2">
              This course includes:
            </div>
            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>0 mins on-demand video</li>
              <li>Certificate of completion</li>
            </ul>

            <div className="mt-6">
              <h4 className="font-semibold mb-1 text-gray-800">Instructor</h4>
              <p className="text-sm text-gray-700">Harshit Shinde</p>
              <p className="text-xs text-gray-500 mt-1">
                0 Instructor Rating | 0 Reviews | 0 Students | 1 Course
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Show course content after purchase
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center justify-center bg-green-50 p-6 rounded-lg mb-10">
            <CheckCircle2 className="text-green-600 w-20 h-20 mb-4" />
            <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-2 text-center">
              Purchase Successful!
            </h1>
            <p className="text-lg text-green-700 mb-6 text-center max-w-md">
              Welcome to the course! Start learning below.
            </p>
          </div>

          {/* Course Content */}
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Video */}
            <div className="aspect-video rounded-lg overflow-hidden shadow-md">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/grEKMHGYyns"
                title="Java Tutorial"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            {/* Notes */}
            <div className="bg-gray-100 p-5 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-3">Course Notes</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>Java basics and setup</li>
                <li>Variables, Data Types</li>
                <li>Control Statements</li>
                <li>OOPs Concepts</li>
              </ul>
              <a
                href="/notes/java-basics.pdf"
                download
                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Download Notes (PDF)
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
