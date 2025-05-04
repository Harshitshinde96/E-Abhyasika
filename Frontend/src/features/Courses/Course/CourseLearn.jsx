import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CourseLearn() {
  const [videoProgress, setVideoProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState([]);
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Introduction to Java",
      content: "Java is a powerful, object-oriented programming language known for its portability and security features...",
      completed: false,
      resources: [
        { type: "pdf", title: "Java Basics PDF", url: "/resources/java-basics.pdf" },
        { type: "code", title: "Sample Code", url: "/resources/java-intro-code.zip" }
      ]
    },
    {
      id: 2,
      title: "Setting up Java Environment",
      content: "Install JDK, set up your development environment, and configure your IDE...",
      completed: false,
      resources: [
        { type: "video", title: "Installation Guide", url: "/resources/java-installation.mp4" },
        { type: "link", title: "JDK Download", url: "https://www.oracle.com/java/technologies/downloads/" }
      ]
    },
    {
      id: 3,
      title: "Basic Syntax",
      content: "Learn about variables, data types, and basic operators in Java...",
      completed: false,
      resources: [
        { type: "pdf", title: "Syntax Cheat Sheet", url: "/resources/java-syntax.pdf" },
        { type: "code", title: "Practice Exercises", url: "/resources/java-exercises.zip" }
      ]
    }
  ]);

  const [courseSections] = useState([
    {
      id: 1,
      title: "Java Fundamentals",
      lessons: [
        { id: 1, title: "Introduction to Java", duration: "30 min", completed: false },
        { id: 2, title: "Variables and Data Types", duration: "45 min", completed: false },
        { id: 3, title: "Operators and Expressions", duration: "40 min", completed: false }
      ]
    },
    {
      id: 2,
      title: "Control Flow",
      lessons: [
        { id: 4, title: "If-Else Statements", duration: "35 min", completed: false },
        { id: 5, title: "Loops", duration: "50 min", completed: false },
        { id: 6, title: "Functions", duration: "45 min", completed: false }
      ]
    },
    {
      id: 3,
      title: "Object-Oriented Programming",
      lessons: [
        { id: 7, title: "Classes and Objects", duration: "60 min", completed: false },
        { id: 8, title: "Inheritance", duration: "45 min", completed: false },
        { id: 9, title: "Polymorphism", duration: "50 min", completed: false }
      ]
    }
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleVideoProgress = (e) => {
    const video = e.target;
    const progress = (video.currentTime / video.duration) * 100;
    setVideoProgress(progress);
  };

  const toggleNoteCompletion = (noteId) => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, completed: !note.completed } : note
    ));
  };

  const toggleLessonCompletion = (sectionId, lessonId) => {
    setCourseSections(courseSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          lessons: section.lessons.map(lesson => 
            lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
          )
        };
      }
      return section;
    }));
  };

  const calculateTotalProgress = () => {
    const totalLessons = courseSections.reduce((acc, section) => acc + section.lessons.length, 0);
    const completedLessons = courseSections.reduce((acc, section) => 
      acc + section.lessons.filter(lesson => lesson.completed).length, 0
    );
    const notesProgress = (notes.filter(note => note.completed).length / notes.length) * 100;
    const videoProgressValue = videoProgress;
    const lessonsProgress = (completedLessons / totalLessons) * 100;
    
    return Math.round((notesProgress + videoProgressValue + lessonsProgress) / 3);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 text-gray-800">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
          Java for Beginners: Master Java Programming 🚀
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Welcome to your Java programming journey! This comprehensive course is
          crafted for absolute beginners and covers everything from setting up
          your development environment to mastering object-oriented programming
          concepts and building robust applications.
        </p>
      </header>

      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 mb-16">
        {/* Video Player */}
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden shadow-xl border">
            <video
              className="w-full h-full"
              controls
              onTimeUpdate={handleVideoProgress}
              src="https://example.com/java-course-video.mp4"
              title="Java Course"
            ></video>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Video Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${videoProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{Math.round(videoProgress)}% completed</p>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-xl border">
          <h2 className="text-2xl font-bold mb-4">📚 Course Notes</h2>
          <div className="space-y-4">
            {notes.map((note) => (
              <div 
                key={note.id} 
                className={`p-4 rounded-lg border ${note.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{note.title}</h3>
                  <button
                    onClick={() => toggleNoteCompletion(note.id)}
                    className={`px-3 py-1 rounded text-sm ${
                      note.completed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {note.completed ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>
                <p className="mt-2 text-gray-700">{note.content}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Resources:</h4>
                  <div className="flex flex-wrap gap-2">
                    {note.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700 hover:bg-blue-100"
                      >
                        {resource.type === 'pdf' && '📄'}
                        {resource.type === 'video' && '🎥'}
                        {resource.type === 'code' && '💻'}
                        {resource.type === 'link' && '🔗'}
                        {resource.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Syllabus */}
      <section className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6">📚 Course Syllabus</h2>
        <div className="space-y-6">
          {courseSections.map((section) => (
            <div key={section.id} className="bg-white border rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="text-xl font-semibold text-blue-800">{section.title}</h3>
              </div>
              <div className="divide-y">
                {section.lessons.map((lesson) => (
                  <div key={lesson.id} className="p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={lesson.completed}
                        onChange={() => toggleLessonCompletion(section.id, lesson.id)}
                        className="h-5 w-5 text-blue-600 rounded"
                      />
                      <div>
                        <h4 className="font-medium">{lesson.title}</h4>
                        <p className="text-sm text-gray-500">{lesson.duration}</p>
                      </div>
                    </div>
                    <Link
                      to={`/course/java/lesson/${lesson.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Overview */}
      <section className="max-w-7xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6">📊 Progress Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Video Progress</h3>
            <p className="text-3xl font-bold text-blue-600">{Math.round(videoProgress)}%</p>
            <p className="text-sm text-blue-600 mt-2">Watch time tracked</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Notes Completed</h3>
            <p className="text-3xl font-bold text-green-600">
              {notes.filter(note => note.completed).length}/{notes.length}
            </p>
            <p className="text-sm text-green-600 mt-2">Study materials</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">Lessons Completed</h3>
            <p className="text-3xl font-bold text-purple-600">
              {courseSections.reduce((acc, section) => 
                acc + section.lessons.filter(lesson => lesson.completed).length, 0
              )}/{courseSections.reduce((acc, section) => acc + section.lessons.length, 0)}
            </p>
            <p className="text-sm text-purple-600 mt-2">Course modules</p>
          </div>
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-800 mb-2">Overall Progress</h3>
            <p className="text-3xl font-bold text-orange-600">
              {calculateTotalProgress()}%
            </p>
            <p className="text-sm text-orange-600 mt-2">Total completion</p>
          </div>
        </div>
      </section>
    </div>
  );
} 