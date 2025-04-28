// export default function CourseLearn() {
//   return (
//     <div className="min-h-screen px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
//         Welcome to Java for Beginners 🚀
//       </h1>

//       <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-8">
//         {/* Course Video */}
//         <div className="aspect-video rounded-lg overflow-hidden shadow-md">
//           <iframe
//             className="w-full h-full"
//             src="https://www.youtube.com/embed/grEKMHGYyns"
//             title="Java Tutorial"
//             frameBorder="0"
//             allowFullScreen
//           ></iframe>
//         </div>

//         {/* Course Notes */}
//         <div className="bg-gray-100 p-5 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold mb-3">Course Notes</h2>
//           <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
//             <li>Java basics and setup</li>
//             <li>Variables, Data Types</li>
//             <li>Control Statements</li>
//             <li>OOPs Concepts</li>
//           </ul>
//           <a
//             href="/notes/java-basics.pdf"
//             download
//             className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//           >
//             Download Notes (PDF)
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect } from "react";

export default function CourseLearn() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-10 text-gray-800">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          Java for Beginners: Master Java Programming 🚀
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Welcome to your Java learning journey! This comprehensive course is
          crafted for absolute beginners and covers everything from setting up
          your development environment to building powerful console-based
          applications with object-oriented programming principles.
        </p>
      </header>

      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 mb-16">
        {/* Video Player */}
        <div className="aspect-video rounded-lg overflow-hidden shadow-xl border">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/grEKMHGYyns"
            title="Java Course"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        {/* Notes Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-xl border">
          <h2 className="text-2xl font-bold mb-4">📚 Course Notes</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Complete Java installation and IDE setup guide</li>
            <li>Java Syntax: Statements, Blocks, and Semicolons</li>
            <li>Data Types, Variables, and Type Casting</li>
            <li>Control Flow: if-else, switch, loops</li>
            <li>Methods, Parameters, and Return Types</li>
            <li>Introduction to Object-Oriented Programming (OOP)</li>
            <li>Classes, Objects, Constructors, and Inheritance</li>
            <li>Access Modifiers, Static and Final Keywords</li>
            <li>Exception Handling and File I/O Basics</li>
          </ul>
          <a
            href="/notes/java-basics.pdf"
            download
            className="inline-block mt-6 px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            📥 Download Full Notes (PDF)
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-6 text-center">
          💡 What You'll Learn
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-700">
          <div className="p-4 bg-blue-50 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-blue-800 mb-2">
              Java Fundamentals
            </h3>
            <p>
              Master the foundational syntax, keywords, and structure of Java.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-blue-800 mb-2">OOP Principles</h3>
            <p>
              Deep dive into classes, objects, inheritance, polymorphism, and
              abstraction.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-blue-800 mb-2">
              Project Building
            </h3>
            <p>
              Build console applications to solidify your learning with
              real-world logic.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-blue-800 mb-2">
              Debugging Techniques
            </h3>
            <p>Use IDEs and logs to troubleshoot and understand Java errors.</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-blue-800 mb-2">Input/Output</h3>
            <p>
              Learn how to read from and write to files using Java I/O
              libraries.
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-blue-800 mb-2">
              Basic Data Structures
            </h3>
            <p>
              Arrays, ArrayLists, LinkedLists and how to use them effectively in
              Java.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto bg-white border border-gray-200 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          👨‍🏫 About the Instructor
        </h2>
        <div className="flex flex-col sm:flex-row gap-6">
          <img
            src="https://img.freepik.com/free-vector/young-man-with-glasses-avatar_1308-173760.jpg"
            alt="Instructor"
            className="w-32 h-32 object-cover rounded-full border-2 border-blue-400"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              Harshit Satish Shinde
            </h3>
            <p className="text-sm text-gray-700 mb-2">
              MERN Stack Developer | Open Source Enthusiast | Full-Stack Learner
            </p>
            <p className="text-gray-600 text-sm">
              Harshit is a passionate web developer with hands-on experience in
              Java, JavaScript, and modern web technologies. He's dedicated to
              helping beginners break into the tech industry with high-quality
              content and beginner-friendly explanations.
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-16 text-center text-sm text-gray-500">
        &copy; 2025 e-Abhyasika. All rights reserved.
      </footer>
    </div>
  );
}
