import React, { useState } from "react";

const AttendanceHistory = () => {
  const subjects = [
    {
      name: "Mathematics",
      batch: "CS-2",
      schduleTime: "10AM - 11AM",
      time: 60,
    },
    { name: "Physics", batch: "ME-1", schduleTime: "11AM - 12PM", time: 45 },
    {
      name: "Computer Science",
      batch: "EE-2",
      schduleTime: "12PM - 01PM",
      time: 50,
    },
    { name: "Chemistry", batch: "CS-3", schduleTime: "01PM - 02PM", time: 40 },
  ];

  const absenceReasons = [
    "Sick Leave",
    "Personal Leave",
    "Conference",
    "Training",
  ];

  const generateRandomAttendance = () => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      const date = `2024-11-${String(i + 1).padStart(2, "0")}`;
      const eachSubject = subjects.map((subject) => {
        const isPresent = Math.random() > 0.2; // 80% chance of being present
        return {
          subjectName: subject.name,
          status: isPresent ? "Present" : "Absent",
          reason: isPresent
            ? ""
            : absenceReasons[Math.floor(Math.random() * absenceReasons.length)],
          teachingHours: isPresent ? subject.time : 0,
          schduleTime: subject.schduleTime,
          batch: subject.batch,
        };
      });

      data.push({
        date,
        subjects: eachSubject,
      });
    }
    return data;
  };

  const [attendanceData, setAttendanceData] = useState(
    generateRandomAttendance()
  );
  const [selectedDate, setSelectedDate] = useState("");
  console.log(attendanceData);
  // Filter attendance data by selected date
  const filteredAttendance = selectedDate
    ? attendanceData.find((record) => record.date === selectedDate)
    : null;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Attendance History</h1>

      {/* Date Picker */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>

          <input
            type="date"
            className="border border-gray-300 rounded p-2"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setSelectedDate("");
          }}
          className="bg-red-500 mt-7 text-white px-4 py-2 text-nowrap rounded-md hover:bg-red-600"
        >
          Reset
        </button>
      </div>

      {/* Attendance Details */}
      {selectedDate ? (
        <div className="bg-white shadow rounded-lg p-4">
          {filteredAttendance ? (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Attendance on {filteredAttendance.date}
              </h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 text-center bg-gray-200 p-3">
                      Schedule Time
                    </th>
                    <th className="border border-gray-300 text-center bg-gray-200 p-3">
                      Subject
                    </th>
                    <th className="border border-gray-300 text-center bg-gray-200 p-3">
                      Batch
                    </th>
                    <th className="border border-gray-300 text-center bg-gray-200 p-3">
                      Status
                    </th>
                    <th className="border border-gray-300 text-center bg-gray-200 p-3">
                      Reason
                    </th>
                    <th className="border border-gray-300 text-center bg-gray-200 p-3">
                      Teaching Hours
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.subjects.map((subject) => (
                    <tr key={subject.subjectName}>
                      <td className="border border-gray-300 text-center p-2">
                        {subject.schduleTime}
                      </td>
                      <td className="border border-gray-300 text-center p-2">
                        {subject.subjectName}
                      </td>
                      <td className="border border-gray-300 text-center p-2">
                        {subject.batch}
                      </td>
                      <td
                        className={`border border-gray-300 text-center p-2 ${
                          subject.status === "Absent"
                            ? "text-red-500 font-semibold"
                            : ""
                        }`}
                      >
                        {subject.status}
                      </td>
                      <td className="border border-gray-300 text-center p-2">
                        {subject.reason || "-"}
                      </td>
                      {/* <td className="border border-gray-300 text-center p-2">
                        {subject.teachingHours} mins
                      </td> */}
                      <td
                        title={`${
                          subject.status === "Present" ? "Present" : "Absent"
                        }`}
                        className={`border border-gray-300 text-center p-2 ${
                          subject.status === "Absent"
                            ? "text-red-500 font-semibold"
                            : ""
                        }`}
                      >
                        {`${
                          subject.status === "Present"
                            ? `${subject.teachingHours} mins`
                            : "Absent"
                        }`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-red-500">
              No record found for the selected date.
            </p>
          )}
        </div>
      ) : (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Overall Attendance</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th
                  colSpan={5}
                  className="border border-gray-300 bg-gray-200 p-3 text-center font-bold"
                >
                  Date
                </th>
              </tr>
              <tr>
                <th className="border border-gray-300 bg-gray-200 p-3 text-center font-bold">
                  Schedule Time
                </th>
                <th className="border border-gray-300 bg-gray-200 p-3 text-center font-bold">
                  Subject
                </th>
                <th className="border border-gray-300 bg-gray-200 p-3 text-center font-bold">
                  Batch
                </th>
                <th className="border border-gray-300 bg-gray-200 p-3 text-center font-bold">
                  Teaching Hours
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record) => (
                <React.Fragment key={record.date}>
                  <tr className="bg-gray-200">
                    <td
                      className="border border-gray-300 text-center p-3"
                      colSpan={record.subjects.length}
                    >
                      {record.date}
                    </td>
                  </tr>
                  {record.subjects.map((subject, index) => (
                    <tr key={`${record.date}-${subject.subjectName}`}>
                      {/* Show date only in the first row for each date */}

                      <td className="border border-gray-300 text-center p-2">
                        {subject.schduleTime}
                      </td>
                      <td className="border border-gray-300 text-center p-2">
                        {subject.subjectName}
                      </td>
                      <td className="border border-gray-300 text-center p-2">
                        {subject.batch}
                      </td>
                      <td
                        title={`${
                          subject.status === "Present"
                            ? "Present"
                            : `Reason: ${subject.reason}`
                        }`}
                        className={`border border-gray-300 text-center p-2 ${
                          subject.status === "Absent"
                            ? "text-red-500 font-semibold"
                            : ""
                        }`}
                      >
                        {`${
                          subject.status === "Present"
                            ? `${subject.teachingHours} mins`
                            : "Absent"
                        }`}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceHistory;
