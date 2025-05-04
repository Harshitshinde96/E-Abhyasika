import { useState } from 'react';

const CourseNotes = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [newNote, setNewNote] = useState('');
  const [selectedModule, setSelectedModule] = useState(null);

  // Mock notes data - in real app, this would come from an API
  const notes = {
    all: [
      {
        id: 1,
        title: "Java Basics Notes",
        content: "Java is a high-level, class-based, object-oriented programming language...",
        module: "Introduction to Java",
        date: "2024-03-10",
        tags: ["basics", "syntax", "fundamentals"],
        isPinned: true
      },
      {
        id: 2,
        title: "OOP Concepts",
        content: "Object-Oriented Programming (OOP) is a programming paradigm based on the concept of objects...",
        module: "Object-Oriented Programming",
        date: "2024-03-12",
        tags: ["OOP", "classes", "objects"],
        isPinned: false
      }
    ],
    pinned: [
      {
        id: 1,
        title: "Java Basics Notes",
        content: "Java is a high-level, class-based, object-oriented programming language...",
        module: "Introduction to Java",
        date: "2024-03-10",
        tags: ["basics", "syntax", "fundamentals"],
        isPinned: true
      }
    ]
  };

  const modules = [
    "Introduction to Java",
    "Object-Oriented Programming",
    "Advanced Java Concepts",
    "Data Structures",
    "Algorithms"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Notes</h1>
          <p className="text-gray-600">
            Take and organize your course notes for better learning.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Modules</h2>
              <div className="space-y-2">
                {modules.map((module) => (
                  <button
                    key={module}
                    onClick={() => setSelectedModule(module)}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      selectedModule === module
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {module}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notes Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {['all', 'pinned'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-6 text-sm font-medium ${
                        activeTab === tab
                          ? 'border-b-2 border-blue-500 text-blue-600'
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              {/* New Note Form */}
              <div className="p-6 border-b border-gray-200">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Start typing your note..."
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Add Tags
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Attach File
                    </button>
                  </div>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Save Note
                  </button>
                </div>
              </div>

              {/* Notes List */}
              <div className="p-6">
                {notes[activeTab].map((note) => (
                  <div
                    key={note.id}
                    className="border rounded-lg p-6 mb-4 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {note.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>📅 {note.date}</span>
                          <span>📚 {note.module}</span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-gray-600 mb-4">{note.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-4">
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseNotes; 