import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { IoIosArrowForward } from "../../utils/icons";
import { useSidebar } from "../../context/SidebarContext";
import Header from "../Common/Header";
import Navbar from "../Common/Navbar";
import ErrorBox from "../Common/ErrorBox";

const AddStudent = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();
  const { year, branch } = useParams();
  const [errorMessage, setErrorMessage] = useState([{ isActive: false }]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    StudentName: "",
    EnrollmentNo: "",
    Branch: "",
    Batch: "",
    Year: "",
    Semester: "",
    ContactNo: "",
    Email: "",
    Address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filterFormData = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        if (value !== "" && value !== null && value !== " ") {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}student/add-student`,
        filterFormData
      );
      console.log(response);
      // alert("Student added successfully!");
      navigate(`/${year}/${branch}`, {
        state: {
          error: "success",
          message: response.data.message || "Student added successfully!",
        },
      });
    } catch (error) {
      // console.error(
      //   "Error adding student:",
      //   error.response?.data || error.message
      // );

      setErrorMessage(() => [
        {
          id: Math.random(),
          type: "error",
          message:
            error.response?.data.error ||
            "Failed to add student. Please try again.",
          isActive: true,
        },
      ]);
    }
  };

  const changeBranchFormat = branch
    .replace(/(^\w|\-\s*\w)/g, (match) => match.toUpperCase())
    .replace("-", " ");

  const changeYearFormat = year
    .replace(/(^\w|\.\s*\w)/g, (match) => match.toUpperCase())
    .replace("-", " ");

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Navbar isSidebarVisible={isSidebarVisible} />

      <div
        className={`content-wrapper ${isSidebarVisible ? "" : "full-width"}`}
      >
        <main>
          <section className="page-header">
            <div className="header-title">
              <h1>Add Student</h1>
            </div>
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <Link to="/dashboard">Home</Link>
              <span>
                <IoIosArrowForward className="breadcrumb-icon" />
              </span>
              <Link to={`/${year}`}>{changeYearFormat}</Link>
              <span>
                <IoIosArrowForward className="breadcrumb-icon" />
              </span>
              <Link to={`/${year}/${branch}`}>{changeBranchFormat}</Link>
              <span>
                <IoIosArrowForward className="breadcrumb-icon" />
              </span>
              <span className="current-breadcrumb">Add Student</span>
            </div>
            {errorMessage[0].isActive &&
              errorMessage.map((errorMessage) => (
                <ErrorBox
                  key={errorMessage.id}
                  type={errorMessage.type}
                  message={errorMessage.message}
                  onClose={() => {
                    setErrorMessage([{ isActive: false }]);
                  }}
                />
              ))}
          </section>
          <section className="explore-details">
            <div className="min-h-screen bg-gray-100 py-10">
              <div className="container mx-auto px-4">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto"
                >
                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Name
                        <input
                          type="text"
                          name="StudentName"
                          value={formData.StudentName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border rounded focus:ring focus:outline-none"
                        />
                      </label>
                    </div>

                    {/* <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Student ID
                        <input
                          type="text"
                          name="studentID"
                          value={formData.studentID}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border rounded focus:ring focus:outline-none"
                        />
                      </label>
                    </div> */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Enrollment Number
                        <input
                          type="text"
                          name="EnrollmentNo"
                          value={formData.EnrollmentNo}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded focus:ring focus:outline-none"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Branch
                        <input
                          type="text"
                          name="Branch"
                          value={formData.Branch}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border rounded focus:ring focus:outline-none"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Batch
                        <input
                          type="text"
                          name="Batch"
                          value={formData.Batch}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded focus:ring focus:outline-none"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Year
                        <input
                          type="number"
                          name="Year"
                          value={formData.Year}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border rounded focus:ring focus:outline-none"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Semester
                        <input
                          type="number"
                          name="Semester"
                          value={formData.Semester}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border rounded focus:ring focus:outline-none"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Contact
                        <input
                          type="number"
                          name="ContactNo"
                          value={formData.ContactNo}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border rounded focus:ring focus:outline-none"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        Email
                        <input
                          type="email"
                          name="Email"
                          value={formData.Email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded focus:ring focus:outline-none"
                        />
                      </label>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-600">
                        Address
                        <textarea
                          name="Address"
                          value={formData.Address}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded focus:ring focus:outline-none"
                        ></textarea>
                      </label>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={() => navigate(`/${year}/${branch}`)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Add Student
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default AddStudent;
