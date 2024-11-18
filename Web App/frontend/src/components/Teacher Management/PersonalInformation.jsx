import React from "react";

const PersonalInformation = () => {
  const teacherInfo = {
    name: "Dr. Jane Smith",
    degination : "Assistant Professor",
    teacherID: "TCH56789",
    department: "EI & CE",
    subjects: ["Algebra", "Calculus", "Statistics"],
    experience: "12 years",
    contact: "+1 987 654 3210",
    email: "janesmith@example.com",
    office: "Room 204, Math Building",
    qualifications: "Ph.D. in Mathematics, B.Ed.",
    address: "456 Maple Avenue, Springfield, USA",
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Teacher Information
          </h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {teacherInfo.name}
            </p>
          </div>

          {/* Teacher ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Teacher ID
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {teacherInfo.teacherID}
            </p>
          </div>

          {/* Teacher ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Degination
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {teacherInfo.degination}
            </p>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Department
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {teacherInfo.department}
            </p>
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Subjects
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {teacherInfo.subjects.join(", ")}
              {/* {teacherInfo.subjects.map((subject, index) => (
                // <li key={index}>{subject} </li>
                {subject}
              ))} */}
            </p>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Experience
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {teacherInfo.experience}
            </p>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Contact
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {teacherInfo.contact}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {teacherInfo.email}
            </p>
          </div>

          {/* Office */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Office Location
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {teacherInfo.office}
            </p>
          </div>

          {/* Qualifications */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Qualifications
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {teacherInfo.qualifications}
            </p>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">
              Address
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-800">
              {teacherInfo.address}
            </p>
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
