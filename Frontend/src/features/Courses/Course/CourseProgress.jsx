import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const CourseProgress = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock topics data - in real app, this would come from an API
  const topics = [
    {
      id: 1,
      title: "Classes and Objects",
      duration: "60 min",
      progress: 85,
      completed: true,
      lastAccessed: "2024-03-15",
      description: "Learn about class definitions, object instantiation, and basic OOP concepts."
    },
    {
      id: 2,
      title: "Inheritance",
      duration: "45 min",
      progress: 60,
      completed: false,
      lastAccessed: "2024-03-16",
      description: "Understand how to create class hierarchies and reuse code through inheritance."
    },
    {
      id: 3,
      title: "Polymorphism",
      duration: "50 min",
      progress: 30,
      completed: false,
      lastAccessed: "2024-03-17",
      description: "Explore method overriding, dynamic binding, and interface implementation."
    },
    {
      id: 4,
      title: "Encapsulation",
      duration: "40 min",
      progress: 0,
      completed: false,
      lastAccessed: null,
      description: "Learn about data hiding and access modifiers in OOP."
    },
    {
      id: 5,
      title: "Abstraction",
      duration: "55 min",
      progress: 0,
      completed: false,
      lastAccessed: null,
      description: "Understand abstract classes and interfaces in Java."
    }
  ];

  // Calculate overall progress
  const overallProgress = topics.reduce((acc, topic) => acc + topic.progress, 0) / topics.length;

  // Prepare data for progress chart
  const progressData = [
    { name: 'Classes', progress: 85 },
    { name: 'Inheritance', progress: 60 },
    { name: 'Polymorphism', progress: 30 },
    { name: 'Encapsulation', progress: 0 },
    { name: 'Abstraction', progress: 0 }
  ];

  // Colors for progress visualization
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Progress</h1>
          <p className="text-gray-600">
            Track your learning progress in Object-Oriented Programming.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
              <div className="space-y-2">
                {['overview', 'topics', 'analytics'].map((tab) => (
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

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Overall Progress */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Overall Progress</h2>
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
                          strokeDasharray={`${overallProgress * 2.51} 251`}
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
                          {overallProgress.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topics.map((topic) => (
                    <div
                      key={topic.id}
                      className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {topic.title}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span>⏱️ {topic.duration}</span>
                            {topic.lastAccessed && (
                              <span>📅 Last accessed: {topic.lastAccessed}</span>
                            )}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            topic.completed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {topic.completed ? 'Completed' : 'In Progress'}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">{topic.description}</p>

                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${topic.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">
                          {topic.progress}% complete
                        </span>
                        <button className="text-blue-600 hover:text-blue-800">
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Topics Tab */}
            {activeTab === 'topics' && (
              <div className="space-y-6">
                {topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {topic.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>⏱️ {topic.duration}</span>
                          {topic.lastAccessed && (
                            <span>📅 Last accessed: {topic.lastAccessed}</span>
                          )}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          topic.completed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {topic.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{topic.description}</p>

                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${topic.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500">
                        {topic.progress}% complete
                      </span>
                      <button className="text-blue-600 hover:text-blue-800">
                        Continue Learning
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* Progress Chart */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Progress by Topic</h2>
                  <div className="h-64">
                    <LineChart width={600} height={300} data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="progress" stroke="#3B82F6" />
                    </LineChart>
                  </div>
                </div>

                {/* Topic Distribution */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Topic Distribution</h2>
                  <div className="h-64">
                    <PieChart width={600} height={300}>
                      <Pie
                        data={progressData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="progress"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {progressData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
