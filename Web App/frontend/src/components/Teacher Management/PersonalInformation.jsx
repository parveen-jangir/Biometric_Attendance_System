import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Common/Loading";

const PersonalInformation = ({
  teacherProfileData,
  teacherprofile,
  handleChildError,
}) => {
  const [teacherData, setTeacherData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const [editFormData, setEditFormData] = useState(null);
  useEffect(() => {
    if (teacherProfileData && teacherProfileData.length > 0) {
      setTeacherData(teacherProfileData[0]);
      setEditFormData(teacherProfileData[0]);
    }
  }, [teacherProfileData]);
  // Toggle edit mode
  const handleEditClick = () => {
    if (!isEditing) {
      setEditFormData({ ...teacherData });
    }
    setIsEditing(!isEditing);
  };
  const handleCancelEdit = () => {
    setEditFormData({ ...teacherData });
    setIsEditing(false);
  };

  // Handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name === "Subjects" ? value.split(", ") : value,
    }));
  };

  if (!teacherData) {
    return <Loading />;
  }

  const postEditTeacher = async () => {
    try {
      const checkChangedData = {};

      for (let key in editFormData) {
        if (editFormData[key] !== teacherData[key]) {
          checkChangedData[key] = editFormData[key];
        }
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}teacher/edit-teacher/${teacherprofile}`,
        checkChangedData
      );

      const { message, Path: updatedPath } = response.data;
      setTeacherData((prev) => ({ ...prev, ...checkChangedData }));
      setIsEditing(false);

      // alert("Profile updated successfully!");
      if (updatedPath && updatedPath !== teacherprofile) {
        navigate(`/teacher-management/${updatedPath}`, { replace: true });
      }
      handleChildError("success", message || "Profile updated successfully!");
    } catch (error) {
      // console.error(
      //   "Error updating teacher profile:",
      //   error.response?.data.error || error.message
      // );

      handleChildError(
        "error",
        error.response?.data.error ||
          "Failed to update profile. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Teacher Information
          </h1>
          {isEditing ? (
            <button
              onClick={postEditTeacher}
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
                name="TeacherName"
                value={editFormData.TeacherName}
                required
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {teacherData.TeacherName}
              </p>
            )}
          </div>

          {/* Teacher ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Teacher ID
            </label>
            {isEditing ? (
              <input
                type="text"
                name="TeacherID"
                value={editFormData.TeacherID}
                required
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {teacherData.TeacherID}
              </p>
            )}
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Designation
            </label>
            {isEditing ? (
              <input
                type="text"
                name="Designation"
                value={editFormData.Designation}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {teacherData.Designation}
              </p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Department
            </label>
            {isEditing ? (
              <input
                type="text"
                name="Department"
                value={editFormData.Department}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {teacherData.Department}
              </p>
            )}
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Subjects
            </label>
            {isEditing ? (
              <input
                type="text"
                name="Subjects"
                value={editFormData.Subjects.join(", ")}
                required
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {editFormData.Subjects.join(", ")}
              </p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Experience
            </label>
            {isEditing ? (
              <input
                type="number"
                name="Experience"
                value={editFormData.Experience}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {teacherData.Experience}
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
                value={editFormData.ContactNo}
                required
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {teacherData.ContactNo}
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
                value={editFormData.Email}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {teacherData.Email}
              </p>
            )}
          </div>

          {/* Office */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Office Location
            </label>
            {isEditing ? (
              <input
                type="text"
                name="OfficeLocation"
                value={editFormData.OfficeLocation}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {teacherData.OfficeLocation}
              </p>
            )}
          </div>

          {/* Qualifications */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Qualifications
            </label>
            {isEditing ? (
              <input
                type="text"
                name="Qualifications"
                value={editFormData.Qualifications}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {teacherData.Qualifications}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Address
            </label>
            {isEditing ? (
              <textarea
                name="Address"
                value={editFormData.Address}
                onChange={handleInputChange}
                className="mt-1 text-lg font-semibold text-gray-800 border border-gray-300 rounded p-2 w-full"
              />
            ) : (
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {teacherData.Address}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          {isEditing ? (
            <button
              className="bg-red-500 text-white px-4 py-2 text-nowrap rounded hover:bg-red-600"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          ) : (
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => navigate(-1)}
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
