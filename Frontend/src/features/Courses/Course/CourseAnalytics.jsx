import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const CourseAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');

  // Mock data - in real app, this would come from an API
  const progressData = {
    week: [
      { date: 'Mon', progress: 20, timeSpent: 45 },
      { date: 'Tue', progress: 35, timeSpent: 60 },
      { date: 'Wed', progress: 50, timeSpent: 75 },
      { date: 'Thu', progress: 65, timeSpent: 90 },
      { date: 'Fri', progress: 80, timeSpent: 120 },
      { date: 'Sat', progress: 90, timeSpent: 150 },
      { date: 'Sun', progress: 95, timeSpent: 180 }
    ],
    month: [
      { date: 'Week 1', progress: 20, timeSpent: 180 },
      { date: 'Week 2', progress: 45, timeSpent: 360 },
      { date: 'Week 3', progress: 70, timeSpent: 540 },
      { date: 'Week 4', progress: 95, timeSpent: 720 }
    ]
  };

  const topicData = [
    { name: 'Java Basics', value: 30 },
    { name: 'OOP Concepts', value: 25 },
    { name: 'Data Structures', value: 20 },
    { name: 'Algorithms', value: 15 },
    { name: 'Advanced Topics', value: 10 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const stats = {
    totalTimeSpent: '15 hours',
    averageDailyTime: '2.1 hours',
    completionRate: '75%',
    quizScore: '85%'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Analytics</h1>
          <p className="text-gray-600">
            Track your learning progress and performance metrics.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Time Spent</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.totalTimeSpent}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Average Daily Time</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.averageDailyTime}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.completionRate}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500">Average Quiz Score</h3>
            <p className="text-2xl font-semibold text-gray-900">{stats.quizScore}</p>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Learning Progress</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  timeRange === 'week'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-4 py-2 rounded-lg text-sm ${
                  timeRange === 'month'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Month
              </button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData[timeRange]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="progress"
                  stroke="#8884d8"
                  name="Progress (%)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="timeSpent"
                  stroke="#82ca9d"
                  name="Time Spent (min)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Topic Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Topic Distribution
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topicData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {topicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Learning Insights */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Learning Insights
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">
                  Best Learning Time
                </h3>
                <p className="text-blue-700">
                  You're most productive between 2 PM and 5 PM
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">
                  Strongest Topic
                </h3>
                <p className="text-green-700">
                  You've mastered Object-Oriented Programming concepts
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-800 mb-2">
                  Areas for Improvement
                </h3>
                <p className="text-yellow-700">
                  Consider spending more time on Data Structures
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAnalytics; 