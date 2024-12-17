import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Dashboard from "./components/Dashboard";
import OtpVerification from "./components/Auth/OtpVerification";
import ConfirmNewPassword from "./components/Auth/ConfirmNewPassword";
import Enroll from "./components/Enrollment";
import Students from "./components/Student Management/Students";
import TeacherManagement from "./components/Teacher Management/TeacherManagement";
import Year from "./components/Student Management/Year";
import BranchPage from "./components/Student Management/BranchPage";
import { SidebarProvider } from "./context/SidebarContext";
import "./tailwind.css"; // Or the path to your CSS file
import StudentProfile from "./components/Student Management/StudentProfile";
import TimetableManagement from "./components/Timetable Management/TimetableManagement";
import TeacherProfile from "./components/Teacher Management/TeacherProfile";
// import Error from "./components/Common/ErrorBox";
import AddTeacher from "./components/Teacher Management/AddTeacher";
import AddStudent from "./components/Student Management/AddStudent";

function App() {
  return (
    <SidebarProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/confirm-newpassword" element={<ConfirmNewPassword />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/timetable" element={<TimetableManagement />} />
        {/* <Route path="/404" element={<Error />} />
        <Route path="/*" element={<Error />} /> */}

        {/* Teacher Management Routes */}
        <Route path="/teacher-management" element={<TeacherManagement />} />
        <Route
          path="/teacher-management/:teacherprofile"
          element={<TeacherProfile />}
        />
        <Route
          path="/teacher-management/add-teacher"
          element={<AddTeacher />}
        />

        <Route path="/students" element={<Students />} />
        {/* Student Management Routes */}
        <Route path="/:year" element={<Year />} />
        <Route path="/:year/:branch" element={<BranchPage />} />
        <Route
          path="/:year/:branch/:studentprofile"
          element={<StudentProfile />}
        />
        <Route path="/:year/:branch/add-student" element={<AddStudent />} />
      </Routes>
    </SidebarProvider>
  );
}

export default App;
