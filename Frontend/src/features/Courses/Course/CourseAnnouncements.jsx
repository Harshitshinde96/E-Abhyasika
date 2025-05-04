import { useState } from 'react';

const CourseAnnouncements = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'normal'
  });

  // Mock announcements data - in real app, this would come from an API
  const announcements = [
    {
      id: 1,
      title: "Course Schedule Update",
      content: "The midterm exam has been rescheduled to next week. Please check the updated schedule in the course calendar.",
      date: "2024-03-10",
      author: "Prof. Smith",
      priority: "high",
      isRead: false
    },
    {
      id: 2,
      title: "Assignment Submission Guidelines",
      content: "Please ensure all assignments are submitted in PDF format with proper formatting and citations.",
      date: "2024-03-08",
      author: "TA Johnson",
      priority: "normal",
      isRead: true
    },
    {
      id: 3,
      title: "Office Hours Change",
      content: "My office hours have been updated to Monday and Wednesday afternoons. Please check the updated schedule.",
      date: "2024-03-05",
      author: "Prof. Smith",
      priority: "normal",
      isRead: true
    }
  ];

  const priorityColors = {
    high: "bg-red-100 text-red-800",
    normal: "bg-blue-100 text-blue-800",
    low: "bg-green-100 text-green-800"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Announcements</h1>
          <p className="text-gray-600">
            Stay updated with important course information and updates.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Priority</h3>
                  <div className="space-y-2">
                    {['all', 'high', 'normal', 'low'].map((priority) => (
                      <button
                        key={priority}
                        onClick={() => setActiveTab(priority)}
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === priority
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Announcements Content */}
          <div className="lg:col-span-3">
            {/* New Announcement Form */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">New Announcement</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Content"
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
                <div className="flex justify-between items-center">
                  <select
                    value={newAnnouncement.priority}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value })}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low Priority</option>
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Post Announcement
                  </button>
                </div>
              </div>
            </div>

            {/* Announcements List */}
            <div className="space-y-4">
              {announcements
                .filter((announcement) => activeTab === 'all' || announcement.priority === activeTab)
                .map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`bg-white rounded-lg shadow-sm p-6 ${
                      !announcement.isRead ? 'border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {announcement.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>📅 {announcement.date}</span>
                          <span>👤 {announcement.author}</span>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          priorityColors[announcement.priority]
                        }`}
                      >
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                      </span>
                    </div>
                    <p className="text-gray-600">{announcement.content}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAnnouncements; 