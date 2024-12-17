import React, { useEffect, useState } from "react";
import axios from "axios";
import { replace, useNavigate } from "react-router-dom";
import Loading from "../Common/Loading";
import ErrorBox from "../Common/ErrorBox";

const PersonalInformation = ({
  studentProfileData,
  year,
  branch,
  studentprofile,
  handleChildError,
}) => {
  const [studentData, setStudentData] = useState(null);
  const [editFormData, setEditFormData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  // const [errorMessage, setErrorMessage] = useState([{ isActive: false }]);
  const navigate = useNavigate();

  const handleCancelEdit = () => {
    setEditFormData({ ...studentData });
    setIsEditing(false);
  };
  const handleEditClick = () => {
    if (!isEditing) {
      setEditFormData({ ...studentData });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (studentProfileData && studentProfileData.length > 0) {
      setStudentData(studentProfileData[0]);
      setEditFormData(studentProfileData[0]);
    }
  }, [studentProfileData]);

  if (!studentData) {
    return <Loading />;
  }

  const postEditStudent = async () => {
    try {
      const checkChangedData = {};

      for (const key in studentData) {
        if (studentData[key] !== editFormData[key]) {
          checkChangedData[key] = editFormData[key];
        }
      }

      if (Object.keys(checkChangedData).length === 0) {
        setErrorMessage(() => [
          {
            id: Math.random(),
            type: "error",
            message: "No changes are made",
            isActive: true,
          },
        ]);
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}student/edit-student/${studentprofile}`,
        checkChangedData
      );
      const { Year, path, studentPath, message } = response.data;
      setStudentData((prev) => ({ ...prev, ...checkChangedData }));
      setIsEditing(false);

      const updatedYear = Year || year;
      const updatedPath = path || branch;
      const updatedStudentPath = studentPath || studentprofile;

      // alert(message || "Profile updated successfully!");

      navigate(`/${updatedYear}/${updatedPath}/${updatedStudentPath}`, {
        replace: true,
      });
      handleChildError("success", message || "Profile updated successfully!");
      // setErrorMessage(() => [
      //   {
      //     id: Math.random(),
      //     type: "success",
      //     message: message || "Profile updated successfully!",
      //     isActive: true,
      //   },
      // ]);
    } catch (error) {
      handleChildError(
        "error",
        error.response?.data.error ||
          "Failed to update profile. Please try again."
      );
      // setErrorMessage(() => [
      //   {
      //     id: Math.random(),
      //     type: "error",
      //     message:
      //       error.response?.data.error ||
      //       "Failed to update profile. Please try again.",
      //     isActive: true,
      //   },
      // ]);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
      {/* {errorMessage[0].isActive &&
        errorMessage.map((errorMessage) => (
          <ErrorBox
            key={errorMessage.id}
            type={errorMessage.type}
            message={errorMessage.message}
            onClose={() => {
              setErrorMessage([{ isActive: false }]);
            }}
          />
        ))} */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Personal Information
          </h1>
          {isEditing ? (
            <button
              onClick={postEditStudent}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="StudentName"
                value={editFormData.StudentName || ""}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {studentData.StudentName}
              </p>
            )}
          </div>

          {/* Enrollment */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Enrollment Number
            </label>
            {isEditing ? (
              <input
                type="text"
                name="EnrollmentNo"
                value={editFormData.EnrollmentNo || ""}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {studentData.EnrollmentNo}
              </p>
            )}
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Branch
            </label>
            {isEditing ? (
              <input
                type="text"
                name="Branch"
                value={editFormData.Branch || ""}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {studentData.Branch}
              </p>
            )}
          </div>

          {/* Batch */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Batch
            </label>
            {isEditing ? (
              <input
                type="text"
                name="Batch"
                value={editFormData.Batch || ""}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {studentData.Batch}
              </p>
            )}
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Year
            </label>
            {isEditing ? (
              <input
                type="number"
                name="Year"
                value={editFormData.Year || ""}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {studentData.Year}
              </p>
            )}
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Semester
            </label>
            {isEditing ? (
              <input
                type="number"
                name="Semester"
                value={editFormData.Semester || ""}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {studentData.Semester}
              </p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Contact
            </label>
            {isEditing ? (
              <input
                type="number"
                name="ContactNo"
                value={editFormData.ContactNo || ""}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {studentData.ContactNo}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="Email"
                value={editFormData.Email || ""}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {studentData.Email}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Address
            </label>
            {isEditing ? (
              <input
                type="text"
                name="Address"
                value={editFormData.Address || ""}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {studentData.Address}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          {isEditing ? (
            <button
              onClick={handleCancelEdit}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
