import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CourseGrades = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock grades data - in real app, this would come from an API
  const grades = {
    assignments: [
      {
        id: 1,
        title: "Java Basics Project",
        dueDate: "2024-03-15",
        grade: 85,
        maxGrade: 100,
        weight: 0.2,
        feedback: "Good work! Your program demonstrates a clear understanding of basic Java concepts."
      },
      {
        id: 2,
        title: "OOP Design Assignment",
        dueDate: "2024-03-20",
        grade: 92,
        maxGrade: 100,
        weight: 0.25,
        feedback: "Excellent object-oriented design! Your class hierarchy is well-structured."
      }
    ],
    exams: [
      {
        id: 1,
        title: "Midterm Exam",
        date: "2024-03-25",
        grade: 78,
        maxGrade: 100,
        weight: 0.3,
        feedback: "Good performance on the theoretical questions, but need more practice with practical coding."
      }
    ],
    quizzes: [
      {
        id: 1,
        title: "Java Basics Quiz",
        date: "2024-03-10",
        grade: 90,
        maxGrade: 100,
        weight: 0.1,
        feedback: "Excellent understanding of basic concepts!"
      },
      {
        id: 2,
        title: "OOP Concepts Quiz",
        date: "2024-03-18",
        grade: 88,
        maxGrade: 100,
        weight: 0.15,
        feedback: "Good grasp of OOP principles, but could improve on inheritance concepts."
      }
    ]
  };

  // Calculate overall grade
  const calculateOverallGrade = () => {
    let totalWeight = 0;
    let weightedSum = 0;

    Object.values(grades).forEach(category => {
      category.forEach(item => {
        weightedSum += (item.grade / item.maxGrade) * item.weight;
        totalWeight += item.weight;
      });
    });

    return totalWeight > 0 ? (weightedSum / totalWeight) * 100 : 0;
  };

  // Prepare data for grade trend chart
  const gradeTrendData = [
    { name: 'Quiz 1', grade: 90 },
    { name: 'Assignment 1', grade: 85 },
    { name: 'Quiz 2', grade: 88 },
    { name: 'Assignment 2', grade: 92 },
    { name: 'Midterm', grade: 78 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Grades</h1>
          <p className="text-gray-600">
            Track your academic progress and performance.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
              <div className="space-y-2">
                {['overview', 'assignments', 'exams', 'quizzes'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-4 py-2 rounded-lg ${
                      activeTab === tab
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grades Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Overall Grade */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Overall Grade</h2>
                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          className="text-gray-200"
                          strokeWidth="10"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className="text-blue-600"
                          strokeWidth="10"
                          strokeDasharray={`${calculateOverallGrade() * 2.51} 251`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">
                          {calculateOverallGrade().toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grade Trend */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Grade Trend</h2>
                  <div className="h-64">
                    <LineChart width={600} height={300} data={gradeTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="grade" stroke="#3B82F6" />
                    </LineChart>
                  </div>
                </div>
              </div>
            )}

            {/* Assignments Tab */}
            {activeTab === 'assignments' && (
              <div className="space-y-4">
                {grades.assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {assignment.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>📅 Due: {assignment.dueDate}</span>
                          <span>⭐ Weight: {assignment.weight * 100}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          {assignment.grade}/{assignment.maxGrade}
                        </span>
                        <div className="text-sm text-gray-500">
                          {((assignment.grade / assignment.maxGrade) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{assignment.feedback}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Exams Tab */}
            {activeTab === 'exams' && (
              <div className="space-y-4">
                {grades.exams.map((exam) => (
                  <div key={exam.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {exam.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>📅 Date: {exam.date}</span>
                          <span>⭐ Weight: {exam.weight * 100}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          {exam.grade}/{exam.maxGrade}
                        </span>
                        <div className="text-sm text-gray-500">
                          {((exam.grade / exam.maxGrade) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{exam.feedback}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Quizzes Tab */}
            {activeTab === 'quizzes' && (
              <div className="space-y-4">
                {grades.quizzes.map((quiz) => (
                  <div key={quiz.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {quiz.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>📅 Date: {quiz.date}</span>
                          <span>⭐ Weight: {quiz.weight * 100}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          {quiz.grade}/{quiz.maxGrade}
                        </span>
                        <div className="text-sm text-gray-500">
                          {((quiz.grade / quiz.maxGrade) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{quiz.feedback}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseGrades; 