import { useState } from 'react';

const CourseAssignments = () => {
  const [activeTab, setActiveTab] = useState('pending');

  // Mock assignments data - in real app, this would come from an API
  const assignments = {
    pending: [
      {
        id: 1,
        title: "Java Basics Project",
        dueDate: "2024-03-15",
        description: "Create a simple Java program that demonstrates basic concepts like variables, loops, and conditionals.",
        points: 100,
        submissionType: "code",
        status: "pending"
      },
      {
        id: 2,
        title: "OOP Design Assignment",
        dueDate: "2024-03-20",
        description: "Design and implement a class hierarchy for a simple banking system.",
        points: 150,
        submissionType: "code",
        status: "pending"
      }
    ],
    submitted: [
      {
        id: 3,
        title: "Introduction to Java",
        dueDate: "2024-03-10",
        description: "Write a simple 'Hello World' program and explain the basic structure of a Java program.",
        points: 50,
        submissionType: "code",
        status: "submitted",
        submissionDate: "2024-03-09",
        grade: null
      }
    ],
    graded: [
      {
        id: 4,
        title: "Variables and Data Types",
        dueDate: "2024-03-05",
        description: "Create a program that demonstrates different data types in Java.",
        points: 75,
        submissionType: "code",
        status: "graded",
        submissionDate: "2024-03-04",
        grade: 85,
        feedback: "Good work! Your program demonstrates a clear understanding of data types. Consider adding more comments for better code readability."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Assignments</h1>
          <p className="text-gray-600">
            Complete your assignments and track your progress.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['pending', 'submitted', 'graded'].map((tab) => (
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

          {/* Assignment List */}
          <div className="p-6">
            {assignments[activeTab].map((assignment) => (
              <div
                key={assignment.id}
                className="border rounded-lg p-6 mb-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {assignment.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>📅 Due: {assignment.dueDate}</span>
                      <span>⭐ Points: {assignment.points}</span>
                    </div>
                  </div>
                  {assignment.status === 'graded' && (
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Grade: {assignment.grade}%
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-4">{assignment.description}</p>

                {assignment.status === 'pending' && (
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Start Assignment
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      View Instructions
                    </button>
                  </div>
                )}

                {assignment.status === 'submitted' && (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Submitted on: {assignment.submissionDate}
                    </div>
                    <div className="flex space-x-4">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        View Submission
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        Edit Submission
                      </button>
                    </div>
                  </div>
                )}

                {assignment.status === 'graded' && (
                  <div>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Instructor Feedback
                      </h4>
                      <p className="text-gray-600">{assignment.feedback}</p>
                    </div>
                    <div className="flex space-x-4">
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        View Submission
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                        View Rubric
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Assignment Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Total Assignments
            </h3>
            <p className="text-2xl font-semibold text-gray-900">
              {Object.values(assignments).flat().length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Average Grade
            </h3>
            <p className="text-2xl font-semibold text-gray-900">85%</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Completion Rate
            </h3>
            <p className="text-2xl font-semibold text-gray-900">75%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAssignments; 