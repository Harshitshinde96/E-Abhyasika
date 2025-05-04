import { useState } from 'react';

const CourseDiscussion = () => {
  const [activeTab, setActiveTab] = useState('forum');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: []
  });

  // Mock forum posts data - in real app, this would come from an API
  const forumPosts = [
    {
      id: 1,
      title: "Understanding Java Generics",
      content: "I'm having trouble understanding how to use generics in Java. Can someone explain the concept with a simple example?",
      author: "John Doe",
      date: "2024-03-10",
      replies: 5,
      likes: 12,
      tags: ["java", "generics", "oop"]
    },
    {
      id: 2,
      title: "Best Practices for Exception Handling",
      content: "What are some best practices for handling exceptions in Java applications?",
      author: "Jane Smith",
      date: "2024-03-08",
      replies: 8,
      likes: 15,
      tags: ["java", "exceptions", "best-practices"]
    }
  ];

  // Mock Q&A posts data
  const qaPosts = [
    {
      id: 1,
      question: "What's the difference between ArrayList and LinkedList?",
      answer: "ArrayList is backed by a dynamic array, while LinkedList is implemented as a doubly-linked list. ArrayList provides O(1) access time but O(n) insertion/deletion time, while LinkedList provides O(n) access time but O(1) insertion/deletion time.",
      author: "Prof. Smith",
      date: "2024-03-12",
      upvotes: 25
    },
    {
      id: 2,
      question: "How does garbage collection work in Java?",
      answer: "Java's garbage collector automatically manages memory by identifying and removing objects that are no longer reachable. It uses a mark-and-sweep algorithm and generational collection to optimize performance.",
      author: "TA Johnson",
      date: "2024-03-11",
      upvotes: 18
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Discussion</h1>
          <p className="text-gray-600">
            Engage with your peers and instructors through discussions and Q&A.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
              <div className="space-y-2">
                {['forum', 'q&a'].map((tab) => (
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

          {/* Discussion Content */}
          <div className="lg:col-span-3">
            {/* New Post Form */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">New Post</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Add Tags
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Attach File
                    </button>
                  </div>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Post
                  </button>
                </div>
              </div>
            </div>

            {/* Forum Posts */}
            {activeTab === 'forum' && (
              <div className="space-y-4">
                {forumPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {post.title}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>👤 {post.author}</span>
                          <span>📅 {post.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-500">
                          💬 {post.replies} replies
                        </span>
                        <span className="text-gray-500">
                          👍 {post.likes} likes
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{post.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Q&A Posts */}
            {activeTab === 'q&a' && (
              <div className="space-y-4">
                {qaPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {post.question}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <span>👤 {post.author}</span>
                          <span>📅 {post.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                        </button>
                        <span className="text-gray-500">{post.upvotes}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-gray-600">{post.answer}</p>
                    </div>

                    <button className="text-blue-600 hover:text-blue-800">
                      Add Comment
                    </button>
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

export default CourseDiscussion; 