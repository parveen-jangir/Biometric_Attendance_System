import React, { useState, useEffect } from "react";

const AttendanceHistory = () => {
  // Dummy data for subjects, attendance, and time
  const subjects = [
    { name: "Math", time: 15 }, // Total time per class in minutes
    { name: "Physics", time: 10 },
    { name: "Computer Science", time: 20 },
    { name: "Chemistry", time: 12 },
  ];

  // Random attendance data for the month (1: present, 0: absent)
  const generateRandomAttendance = () => {
    const data = [];
    for (let i = 0; i < 31; i++) {
      // 80% chance of being present (1) and 20% absent (0)
      data.push(Math.random() > 0.2 ? 1 : 0);
    }
    return data;
  };

  // Random time data for each subject when present (in minutes)
  const generateRandomTime = (subjectTime) => {
    return Math.floor(Math.random() * subjectTime) + 30; // Random time between 30 and max time for each subject
  };

  const [attendanceData, setAttendanceData] = useState(
    Array.from({ length: subjects.length }, () => generateRandomAttendance())
  );

  const [attendanceTimeData, setAttendanceTimeData] = useState([]);

  useEffect(() => {
    // Update the attendanceTimeData after attendanceData is set
    const newAttendanceTimeData = attendanceData.map(
      (subjectAttendance, index) =>
        subjectAttendance.map((attendance, dayIndex) =>
          attendance === 1 ? generateRandomTime(subjects[index].time) : 0
        )
    );
    setAttendanceTimeData(newAttendanceTimeData);
  }, [attendanceData]); // This effect will run whenever attendanceData changes

  return (
    <div className="tab-content">
      <h3 className="text-xl font-bold">Attendance History</h3>

      {/* Show attendance history in a table-like format */}
      <div className="attendance-history">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Date</th>
              {subjects.map((subject) => (
                <th key={subject.name} className="border p-2">
                  {subject.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 31 }, (_, i) => (
              <tr key={i}>
                <td className="border p-2">{i + 1}</td>
                {attendanceData.map((subjectAttendance, index) => (
                  <td
                    key={index}
                    className={`border p-2 text-center ${
                      subjectAttendance[i] === 1
                        ? "bg-blue-500 text-white hover:bg-blue-700"
                        : "bg-gray-200"
                    }`}
                    title={
                      subjectAttendance[i] === 1
                        ? `Present - ${attendanceTimeData[index]?.[i]} min`
                        : "Absent"
                    }
                  >
                    {subjectAttendance[i] === 1
                      ? `${attendanceTimeData[index]?.[i] || 0} min`
                      : "A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show total time per subject */}
      <div className="subject-attendance mt-8">
        <h4 className="text-lg font-semibold mb-4">
          Subject Attendance Details
        </h4>
        {subjects.map((subject, index) => {
          const totalTime =
            attendanceTimeData[index]
              ?.filter((time) => time > 0)
              .reduce((a, b) => a + b, 0) || 0;
          const totalTimeToHour = parseInt(totalTime / 60);
          const totalTimeToMin = totalTime % 60;
          return (
            <div key={subject.name} className="subject-item mb-4">
              <p className="font-bold">{subject.name}</p>
              <p>
                Attendance:{" "}
                {attendanceData[index].filter((x) => x === 1).length} days
              </p>
              <p>
                Total Time: {`${totalTimeToHour} : ${totalTimeToMin}`} hours
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceHistory;
