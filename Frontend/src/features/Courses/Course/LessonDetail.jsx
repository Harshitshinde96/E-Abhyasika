import { useState } from 'react';
import { useParams } from 'react-router-dom';

const LessonDetail = () => {
  const { lessonId } = useParams();
  const [activeTab, setActiveTab] = useState('content');

  // Mock lesson data - in real app, this would come from an API
  const lesson = {
    id: lessonId,
    title: "Introduction to Java Programming",
    duration: "45 minutes",
    description: "Learn the fundamentals of Java programming language, its history, and basic concepts.",
    content: {
      video: "https://example.com/java-intro-video.mp4",
      transcript: "Java is a high-level, class-based, object-oriented programming language...",
      slides: "/resources/java-intro-slides.pdf"
    },
    resources: [
      {
        type: "pdf",
        title: "Lesson Notes",
        url: "/resources/java-intro-notes.pdf"
      },
      {
        type: "code",
        title: "Practice Exercises",
        url: "/resources/java-intro-exercises.zip"
      },
      {
        type: "link",
        title: "Official Java Documentation",
        url: "https://docs.oracle.com/javase/tutorial/"
      }
    ],
    quiz: {
      questions: [
        {
          id: 1,
          question: "What is Java?",
          options: [
            "A coffee brand",
            "A programming language",
            "An operating system",
            "A web browser"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "Which of these is a Java keyword?",
          options: [
            "class",
            "function",
            "method",
            "procedure"
          ],
          correctAnswer: 0
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Lesson Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
          <p className="text-gray-600 mb-4">{lesson.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>⏱️ {lesson.duration}</span>
            <span>📚 Lesson {lessonId}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['content', 'resources', 'quiz', 'discussion'].map((tab) => (
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

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  <video
                    className="w-full h-full"
                    controls
                    src={lesson.content.video}
                  ></video>
                </div>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Lesson Transcript</h3>
                  <p className="text-gray-700">{lesson.content.transcript}</p>
                </div>
                <div className="flex justify-end">
                  <a
                    href={lesson.content.slides}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Download Slides
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lesson.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center space-x-3">
                      {resource.type === 'pdf' && '📄'}
                      {resource.type === 'code' && '💻'}
                      {resource.type === 'link' && '🔗'}
                      <span className="font-medium">{resource.title}</span>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Lesson Quiz</h3>
                {lesson.quiz.questions.map((question, index) => (
                  <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium mb-3">
                      {index + 1}. {question.question}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={optionIndex}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Submit Quiz
                </button>
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Ask a question or share your thoughts..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Post
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Mock discussion posts */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center space-x-3 mb-2">
                      <img
                        src="https://ui-avatars.com/api/?name=John+Doe"
                        alt="User"
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Can someone explain the difference between JDK and JRE?
                    </p>
                    <div className="mt-4 flex space-x-4 text-sm text-gray-500">
                      <button className="hover:text-blue-600">Reply</button>
                      <button className="hover:text-blue-600">Like</button>
                    </div>
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

export default LessonDetail; 