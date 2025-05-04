import { useState } from 'react';

const CourseSyllabus = () => {
  const [expandedModule, setExpandedModule] = useState(null);

  // Mock course data - in real app, this would come from an API
  const course = {
    title: "Java Programming Masterclass",
    description: "Learn Java programming from scratch to advanced concepts",
    duration: "60 hours",
    modules: [
      {
        id: 1,
        title: "Introduction to Java",
        duration: "8 hours",
        lessons: [
          {
            id: 1,
            title: "Java Basics",
            duration: "45 min",
            type: "video",
            videoUrl: "https://example.com/java-basics.mp4",
            description: "Learn the fundamentals of Java programming",
            completed: true
          },
          {
            id: 2,
            title: "Variables and Data Types",
            duration: "1 hour",
            type: "video",
            videoUrl: "https://example.com/java-variables.mp4",
            description: "Understanding Java variables and data types",
            completed: true
          },
          {
            id: 3,
            title: "Control Flow",
            duration: "1.5 hours",
            type: "video",
            videoUrl: "https://example.com/java-control-flow.mp4",
            description: "Learn about loops and conditional statements",
            completed: false
          }
        ]
      },
      {
        id: 2,
        title: "Object-Oriented Programming",
        duration: "12 hours",
        lessons: [
          {
            id: 4,
            title: "Classes and Objects",
            duration: "1.5 hours",
            type: "video",
            videoUrl: "https://example.com/java-classes.mp4",
            description: "Understanding classes and objects in Java",
            completed: false
          },
          {
            id: 5,
            title: "Inheritance and Polymorphism",
            duration: "2 hours",
            type: "video",
            videoUrl: "https://example.com/java-inheritance.mp4",
            description: "Learn about inheritance and polymorphism",
            completed: false
          }
        ]
      },
      {
        id: 3,
        title: "Advanced Java Concepts",
        duration: "15 hours",
        lessons: [
          {
            id: 6,
            title: "Collections Framework",
            duration: "2 hours",
            type: "video",
            videoUrl: "https://example.com/java-collections.mp4",
            description: "Understanding Java Collections Framework",
            completed: false
          },
          {
            id: 7,
            title: "Multithreading",
            duration: "2.5 hours",
            type: "video",
            videoUrl: "https://example.com/java-threading.mp4",
            description: "Learn about multithreading in Java",
            completed: false
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>⏱️ {course.duration}</span>
            <span>📚 {course.modules.length} Modules</span>
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div className="bg-blue-600 h-4 rounded-full" style={{ width: '25%' }}></div>
          </div>
          <p className="text-sm text-gray-500">25% Complete</p>
        </div>

        {/* Modules */}
        <div className="space-y-4">
          {course.modules.map((module) => (
            <div key={module.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                className="w-full flex justify-between items-center p-6 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">{module.id}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                    <p className="text-sm text-gray-500">{module.duration}</p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-500 transform transition-transform ${
                    expandedModule === module.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedModule === module.id && (
                <div className="border-t border-gray-200">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          {lesson.completed ? (
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base font-medium text-gray-900">{lesson.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{lesson.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>⏱️ {lesson.duration}</span>
                            <span>🎥 Video</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                          {lesson.completed ? 'Review' : 'Start'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSyllabus; 