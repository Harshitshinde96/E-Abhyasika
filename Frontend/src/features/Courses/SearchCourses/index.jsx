import { useState } from "react";
import { Link } from "react-router-dom";
import WideCourseCard from "./WideCourseCard";

const SearchCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  // Mock courses data
  const courses = [
    {
      _id: "java-course",
      courseName: "Java for Beginners",
      courseSubtitle: "Master Java Programming from Scratch",
      instructor: {
        firstName: "Harshit",
        lastName: "Shinde"
      },
      previewImage: "https://example.com/java-course.jpg",
      ratingAvg: 4.5,
      ratingLength: 120,
      instructionalLevel: "Beginner",
      price: 0,
      language: "Java"
    },
    {
      _id: "python-course",
      courseName: "Python Programming Fundamentals",
      courseSubtitle: "Learn Python from Basics to Advanced",
      instructor: {
        firstName: "Harshit",
        lastName: "Shinde"
      },
      previewImage: "https://example.com/python-course.jpg",
      ratingAvg: 4.7,
      ratingLength: 150,
      instructionalLevel: "Beginner",
      price: 0,
      language: "Python"
    },
    {
      _id: "c-course",
      courseName: "C Programming Mastery",
      courseSubtitle: "Master C Programming and System Development",
      instructor: {
        firstName: "Harshit",
        lastName: "Shinde"
      },
      previewImage: "https://example.com/c-course.jpg",
      ratingAvg: 4.6,
      ratingLength: 100,
      instructionalLevel: "Beginner",
      price: 0,
      language: "C"
    }
  ];

  // Filter courses based on search query and selected language
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.courseSubtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage === "all" || 
                          course.language.toLowerCase() === selectedLanguage.toLowerCase();
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Search Courses</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Languages</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="c">C</option>
          </select>
        </div>

        {/* Courses Grid */}
        <div className="space-y-6">
          {filteredCourses.map((course) => (
            <WideCourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCourses;
