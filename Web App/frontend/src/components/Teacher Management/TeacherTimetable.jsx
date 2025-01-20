import React, { useState } from "react";

const TeacherTimetable = () => {
  const [selectedDay, setSelectedDay] = useState("monday");

  // Timetable data for a single teacher with branches and batches
  const timetable = {
    monday: [
      {
        time: "10:00 AM - 11:00 AM",
        subject: "Math",
        room: "101",
        year: "1st Year",
        branch: "Computer Science",
        batch: "CS-A",
      },
      {
        time: "11:00 AM - 12:00 PM",
        subject: "Math",
        room: "102",
        year: "2nd Year",
        branch: "Information Technology",
        batch: "IT-B",
      },
    ],
    tuesday: [
      {
        time: "12:00 PM - 1:00 PM",
        subject: "Physics",
        room: "201",
        year: "3rd Year",
        branch: "Mechanical Engineering",
        batch: "ME-C",
      },
      {
        time: "2:00 PM - 3:00 PM",
        subject: "Physics",
        room: "202",
        year: "4th Year",
        branch: "Civil Engineering",
        batch: "CE-D",
      },
    ],
    wednesday: [
      {
        time: "10:00 AM - 11:00 AM",
        subject: "Chemistry",
        room: "301",
        year: "1st Year",
        branch: "Electronics Engineering",
        batch: "EE-A",
      },
    ],
    thursday: [],
    friday: [
      {
        time: "1:00 PM - 2:00 PM",
        subject: "Computer Science",
        room: "401",
        year: "3rd Year",
        branch: "Computer Science",
        batch: "CS-B",
      },
    ],
  };

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Teacher Timetable
        </h1>

        {/* Day Selector */}
        <div className="mb-6 flex justify-center gap-4">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg ${
                selectedDay === day
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
              }`}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
          ))}
        </div>

        {/* Timetable for Selected Day */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-700 mb-3 capitalize">
            {selectedDay}
          </h2>
          {timetable[selectedDay]?.length > 0 ? (
            <ul className="space-y-4">
              {timetable[selectedDay].map((slot, index) => (
                <li
                  key={index}
                  className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Time and Subject */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-500">{slot.time}</p>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {slot.subject}
                      </h3>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className="text-sm bg-blue-100 text-blue-600 rounded-full px-3 py-1">
                        Room: {slot.room}
                      </span>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="flex flex-col sm:flex-row justify-between text-sm">
                    <div className="md:text-left">
                      <strong className="text-gray-700">Year:</strong>
                      <span className="text-gray-600 ml-2">{slot.year}</span>
                    </div>
                    <div className="md:text-center">
                      <strong className="text-gray-700">Branch:</strong>
                      <span className="text-gray-600 ml-2">{slot.branch}</span>
                    </div>
                    <div className="md:text-right">
                      <strong className="text-gray-700">Batch:</strong>
                      <span className="text-gray-600 ml-2">{slot.batch}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No classes scheduled.</p>
          )}
        </div>

        {/* <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-700 mb-3 capitalize">
            {selectedDay}
          </h2>
          {timetable[selectedDay]?.length > 0 ? (
            <ul className="space-y-4">
              {timetable[selectedDay].map((slot, index) => (
                <li
                  key={index}
                  className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      {slot.subject}
                    </h3>
                    <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      {slot.time}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">
                        <strong>Year:</strong> {slot.year}
                      </p>
                      <p className="text-gray-600">
                        <strong>Branch:</strong> {slot.branch}
                      </p>
                    </div>
                    <div>
                      <p className="md-text-right text-gray-600">
                        <strong>Batch:</strong> {slot.batch}
                      </p>
                      <p className="md-text-right text-gray-600">
                        <strong>Room:</strong> {slot.room}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No classes scheduled.</p>
          )}
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 shadow-sm">
          <h2 className="text-lg font-semibold text-blue-700 mb-3 capitalize">
            {selectedDay}
          </h2>
          {timetable[selectedDay]?.length > 0 ? (
            <ul className="space-y-4">
              {timetable[selectedDay].map((slot, index) => (
                <li
                  key={index}
                  className="bg-white border border-gray-300 rounded-lg p-4 shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {slot.subject}
                      </h3>
                      <p className="text-sm text-gray-500">{slot.time}</p>
                    </div>
                    <span className="text-sm bg-gray-200 text-gray-700 rounded-full px-3 py-1">
                      Room: {slot.room}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div className="text-sm">
                      <p className="text-gray-600">
                        <strong>Year:</strong> {slot.year}
                      </p>
                      <p className="text-gray-600">
                        <strong>Branch:</strong> {slot.branch}
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600">
                        <strong>Batch:</strong> {slot.batch}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No classes scheduled.</p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default TeacherTimetable;
