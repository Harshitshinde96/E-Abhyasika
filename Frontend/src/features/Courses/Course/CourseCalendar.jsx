import { useState } from 'react';

const CourseCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('month');

  // Mock events data - in real app, this would come from an API
  const events = [
    {
      id: 1,
      title: "Java Basics Lecture",
      date: "2024-03-15",
      time: "10:00 AM",
      type: "lecture",
      location: "Room 101",
      description: "Introduction to Java programming basics"
    },
    {
      id: 2,
      title: "OOP Assignment Due",
      date: "2024-03-20",
      time: "11:59 PM",
      type: "assignment",
      description: "Submit your OOP design project"
    },
    {
      id: 3,
      title: "Midterm Exam",
      date: "2024-03-25",
      time: "9:00 AM",
      type: "exam",
      location: "Room 201",
      description: "Midterm covering Java basics and OOP concepts"
    }
  ];

  const eventTypes = {
    lecture: { color: "bg-blue-100", text: "text-blue-800" },
    assignment: { color: "bg-green-100", text: "text-green-800" },
    exam: { color: "bg-red-100", text: "text-red-800" }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Calendar</h1>
          <p className="text-gray-600">
            Keep track of your course schedule and important dates.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">March 2024</h2>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(new Date(2024, 2, date))}
                    className={`p-2 text-center rounded-full ${
                      selectedDate.getDate() === date
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>

              {/* View Options */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">View</h3>
                <div className="flex space-x-2">
                  {['month', 'week', 'day'].map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`px-3 py-1 text-sm rounded ${
                        view === v
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Events Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h2>

              {/* Events List */}
              <div className="space-y-4">
                {events
                  .filter((event) => event.date === selectedDate.toISOString().split('T')[0])
                  .map((event) => (
                    <div
                      key={event.id}
                      className="border rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                            <span>🕒 {event.time}</span>
                            {event.location && <span>📍 {event.location}</span>}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            eventTypes[event.type].color
                          } ${eventTypes[event.type].text}`}
                        >
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">{event.description}</p>
                    </div>
                  ))}

                {events.filter((event) => event.date === selectedDate.toISOString().split('T')[0]).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No events scheduled for this day</p>
                )}
              </div>

              {/* Add Event Button */}
              <button className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add New Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCalendar; 