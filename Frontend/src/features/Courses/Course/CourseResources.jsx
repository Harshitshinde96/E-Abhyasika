import { useState } from 'react';

const CourseResources = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock resources data - in real app, this would come from an API
  const resources = {
    all: [
      {
        id: 1,
        title: "Java Programming Basics",
        type: "pdf",
        category: "books",
        description: "Comprehensive guide to Java programming fundamentals",
        url: "https://example.com/java-basics.pdf",
        size: "2.5 MB",
        date: "2024-03-01"
      },
      {
        id: 2,
        title: "OOP Concepts Video",
        type: "video",
        category: "tutorials",
        description: "Video tutorial explaining object-oriented programming concepts",
        url: "https://example.com/oop-concepts.mp4",
        duration: "45 min",
        date: "2024-03-05"
      },
      {
        id: 3,
        title: "Sample Project Code",
        type: "code",
        category: "projects",
        description: "Complete source code for a sample Java project",
        url: "https://example.com/sample-project.zip",
        size: "1.2 MB",
        date: "2024-03-10"
      }
    ],
    books: [
      {
        id: 1,
        title: "Java Programming Basics",
        type: "pdf",
        category: "books",
        description: "Comprehensive guide to Java programming fundamentals",
        url: "https://example.com/java-basics.pdf",
        size: "2.5 MB",
        date: "2024-03-01"
      }
    ],
    tutorials: [
      {
        id: 2,
        title: "OOP Concepts Video",
        type: "video",
        category: "tutorials",
        description: "Video tutorial explaining object-oriented programming concepts",
        url: "https://example.com/oop-concepts.mp4",
        duration: "45 min",
        date: "2024-03-05"
      }
    ],
    projects: [
      {
        id: 3,
        title: "Sample Project Code",
        type: "code",
        category: "projects",
        description: "Complete source code for a sample Java project",
        url: "https://example.com/sample-project.zip",
        size: "1.2 MB",
        date: "2024-03-10"
      }
    ]
  };

  const categories = [
    { id: 'all', name: 'All Resources', icon: '📚' },
    { id: 'books', name: 'Books & PDFs', icon: '📖' },
    { id: 'tutorials', name: 'Tutorials', icon: '🎥' },
    { id: 'projects', name: 'Projects', icon: '💻' }
  ];

  const resourceTypes = {
    pdf: { icon: '📄', color: 'bg-red-100 text-red-800' },
    video: { icon: '🎥', color: 'bg-blue-100 text-blue-800' },
    code: { icon: '💻', color: 'bg-green-100 text-green-800' }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Resources</h1>
          <p className="text-gray-600">
            Access all your course materials and learning resources in one place.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      activeCategory === category.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources[activeCategory].map((resource) => (
                  <div
                    key={resource.id}
                    className="border rounded-lg p-6 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {resource.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>{resourceTypes[resource.type].icon}</span>
                          <span>📅 {resource.date}</span>
                          {resource.size && <span>📦 {resource.size}</span>}
                          {resource.duration && <span>⏱️ {resource.duration}</span>}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          resourceTypes[resource.type].color
                        }`}
                      >
                        {resource.type.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{resource.description}</p>

                    <div className="flex justify-between items-center">
                      <a
                        href={resource.url}
                        className="text-blue-600 hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download
                      </a>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Resources */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Learning Resources</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600">📚</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Official Documentation</h3>
                    <a
                      href="https://docs.oracle.com/en/java/"
                      className="text-blue-600 hover:text-blue-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Java Documentation
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600">💬</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Community Forums</h3>
                    <a
                      href="https://stackoverflow.com/questions/tagged/java"
                      className="text-blue-600 hover:text-blue-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Stack Overflow Java
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseResources; 