import React from "react";

const PersonalInformation = () => {
  const studentInfo = {
    name: "John Doe",
    enrollment: "EN123456",
    branch: "Computer Science",
    batch: "Batch A",
    year: "2nd",
    semester: "3rd",
    contact: "+1 234 567 890",
    email: "johndoe@example.com",
    address: "1234 Elm Street, Springfield, USA",
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Personal Information</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <p className="mt-1 text-lg font-semibold text-gray-800">{studentInfo.name}</p>
          </div>

          {/* Enrollment */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Enrollment Number</label>
            <p className="mt-1 text-lg font-semibold text-gray-800">{studentInfo.enrollment}</p>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Branch</label>
            <p className="mt-1 text-lg font-semibold text-gray-800">{studentInfo.branch}</p>
          </div>

          {/* Batch */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Batch</label>
            <p className="mt-1 text-lg font-semibold text-gray-800">{studentInfo.batch}</p>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Year</label>
            <p className="mt-1 text-lg font-semibold text-gray-800">{studentInfo.year}</p>
          </div>

          {/* Semester */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Semester</label>
            <p className="mt-1 text-lg font-semibold text-gray-800">{studentInfo.semester}</p>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Contact</label>
            <p className="mt-1 text-lg font-semibold text-gray-800">{studentInfo.contact}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <p className="mt-1 text-lg font-semibold text-gray-800">{studentInfo.email}</p>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">Address</label>
            <p className="mt-1 text-lg font-semibold text-gray-800">{studentInfo.address}</p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
