import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgetPassword from "./components/ForgetPassword";
import Dashboard from "./components/Dashboard";
import OtpVerification from "./components/OtpVerification";
import ConfirmNewPassword from "./components/ConfirmNewPassword";
import Enroll from "./components/Enrollment";
import Students from "./components/Student Management/Students";
import TeacherManagement from "./components/Teacher Management/TeacherManagement";
import Year from "./components/Student Management/Year";
import BranchPage from "./components/Student Management/BranchPage";
import { SidebarProvider } from "./context/SidebarContext";
import './tailwind.css'; // Or the path to your CSS file
import StudentProfile from "./components/Student Management/StudentProfile";
import Timetable from "./components/Timetable";
import TeacherProfile from "./components/Teacher Management/TeacherProfile";

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
        <Route path="/students" element={<Students />} />
        <Route path="/teacher-management" element={<TeacherManagement />} />
        <Route path="/studentprofile" element={<StudentProfile />} />
        <Route path="/teacherprofile" element={<TeacherProfile />} />
        <Route path="/timetable" element={<Timetable />} />
        


        {/* Year and Branch Routes */}
        <Route path="/year" element={<Year />} />
        <Route path="/year/:branch" element={<BranchPage />} />
      </Routes>
    </SidebarProvider>
  );
}

export default App;
