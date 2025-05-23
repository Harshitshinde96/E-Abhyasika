import { BrowserRouter, Routes, Route } from "react-router-dom";
import Teaching from "./features/Courses/Teaching";
import Signup from "./features/Auth/Signup";
import CreateCourse from "./features/Instructor/Course/CreateCourse";
import CourseLayout from "./features/Instructor/Course/CourseLayout";
import CourseGoals from "./features/Instructor/Course/Goals";
import Dashboard from "./features/Instructor/DashBoard";
import LandingPage from "./features/Instructor/Course/LandingPage";
import Curriculum from "./features/Instructor/Course/Curriculum";
import Home from "./features/Courses/Home";
import Login from "./features/auth/Login";
import PersistLogin from "./features/Auth/PersistLogin";
import RequireAuth from "./features/Auth/RequireAuth";
import ProfileLayout from "./features/Common/Profile/ProfileLayout";
import BasicInformation from "./features/Common/Profile/BasicInformation";
import ProfilePhoto from "./features/Common/Profile/ProfilePhoto";
import Course from "./features/Courses/Course";
import Success from "./features/Courses/Success";
import MyCourses from "./features/Student/MyCourses";
import { ROLES } from "./data/roles";
import "@smastrom/react-rating/style.css";
import "./App.css";
import SearchCourses from "./features/Courses/SearchCourses";
import NavLayout from "./components/NavLayout";
import CourseDetails from "./features/Courses/Course/CourseDetails";
import PythonCourseDetails from "./features/Courses/Course/PythonCourseDetails";
import CCourseDetails from "./features/Courses/Course/CCourseDetails";
import CourseLearn from "./features/Courses/Course/CourseLearn";
import PythonCourseLearn from "./features/Courses/Course/PythonCourseLearn";
import CCourseLearn from "./features/Courses/Course/CCourseLearn";

// ✅ Import Toaster
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      {/* ✅ Toaster container for toast messages */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/join/instructor-signup"
          element={<Signup roles={[ROLES.Student, ROLES.Instructor]} />}
        />
        <Route
          path="join/signup"
          element={<Signup roles={[ROLES.Student]} />}
        />
        <Route path="/join/login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<NavLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search/:query" element={<SearchCourses />} />
            <Route path="/teaching" element={<Teaching />} />
            <Route path="/course/:courseId" element={<Course />} />

            {/* Course Details Routes */}
            <Route path="/course/java" element={<CourseDetails />} />
            <Route path="/course/python" element={<PythonCourseDetails />} />
            <Route path="/course/c" element={<CCourseDetails />} />

            {/* Course Learning Routes */}
            <Route path="/course/java/learn" element={<CourseLearn />} />
            <Route path="/course/python/learn" element={<PythonCourseLearn />} />
            <Route path="/course/c/learn" element={<CCourseLearn />} />

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Student, ROLES.Instructor]} />
              }
            >
              <Route path="/success/:sessionId" element={<Success />} />
              <Route path="/user/my-courses" element={<MyCourses />} />
              <Route path="/user/profile/" element={<ProfileLayout />}>
                <Route
                  path="basic-information"
                  element={<BasicInformation />}
                />
                <Route path="photo" element={<ProfilePhoto />} />
              </Route>
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Instructor]} />}>
            <Route path="/instructor" element={<Dashboard />} />
            <Route path="/course/create" element={<CreateCourse />} />
            <Route path="instructor/profile/" element={<ProfileLayout />}>
              <Route path="basic-information" element={<BasicInformation />} />
              <Route path="photo" element={<ProfilePhoto />} />
            </Route>
            <Route path="instructor/course/" element={<CourseLayout />}>
              <Route path=":courseId/manage/goals" element={<CourseGoals />} />
              <Route
                path=":courseId/manage/curriculum"
                element={<Curriculum />}
              />
              <Route path=":courseId/manage/basics" element={<LandingPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
