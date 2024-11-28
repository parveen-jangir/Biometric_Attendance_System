import db from "../config/database.js";
import database from "../config/database2.js";

export const getTeachersFilter = async (req, res) => {
  const { searchQuery, selectedBranch, selectedSubject } = req.query;

  let query = `SELECT T.TeacherID, T.TeacherName, T.Department, T.Experience, T.Path, JSON_ARRAYAGG(S.SubjectName) AS Subjects
               FROM Teacher T
               JOIN TeacherSubjects TS ON T.TeacherID = TS.TeacherID
               JOIN Subjects S ON S.SubjectID = TS.SubjectID`;
  let conditions = [];
  let queryParams = [];

  if (searchQuery) {
    conditions.push(`T.TeacherName LIKE ?`);
    queryParams.push(`${searchQuery}%`);
  }
  if (selectedBranch) {
    conditions.push(`T.Department = ?`);
    queryParams.push(selectedBranch);
  }
  if (selectedSubject) {
    conditions.push(`S.SubjectName = ?`);
    queryParams.push(selectedSubject);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  query += ` GROUP BY T.TeacherID, T.TeacherName, T.Department, T.Experience, T.Path;`;

  try {
    db.query(query, queryParams, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(400).json({
          // error: "An error occurred while fetching data. Please try again later.",
          error: "Database error",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          error: "No records found",
        });
      }

      return res.json({
        row: result,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getDistinctBranches = async (req, res) => {
  const query = `SELECT DISTINCT Department from Teacher`;
  try {
    db.query(query, [], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(400).json({
          // error: "An error occurred while fetching data. Please try again later.",
          error: "Database error",
        });
      }
      if (result.length === 0) {
        return res.status(404).json({
          error: `No Recored found`,
        });
      }

      return res.json({
        row: result,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getDistinctSubjects = async (req, res) => {
  const query = `SELECT DISTINCT SubjectName FROM Subjects`;
  try {
    db.query(query, [], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(400).json({
          // error: "An error occurred while fetching data. Please try again later.",
          error: "Database error",
        });
      }
      if (result.length === 0) {
        return res.status(404).json({
          error: `No Recored found`,
        });
      }

      return res.json({
        row: result,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getTeacherProfile = async (req, res) => {
  const { teacherprofile } = req.params;

  const query = `SELECT T.*, JSON_ARRAYAGG(S.SubjectName) AS Subjects FROM Teacher T JOIN TeacherSubjects TS ON TS.TeacherID = T.TeacherID JOIN Subjects S ON TS.SubjectID = S.SubjectID WHERE T.Path = ? GROUP BY T.TeacherID`;
  try {
    db.query(query, [teacherprofile], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(400).json({
          // error: "An error occurred while fetching data. Please try again later.",
          error: "Database error",
        });
      }
      if (result.length === 0) {
        return res.status(404).json({
          error: `No Recored found`,
        });
      }

      return res.json({
        row: result,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const addTeacher = async (req, res) => {
  const {
    name,
    teacherID,
    designation,
    department,
    subject,
    experience,
    contact,
    email,
    office,
    qualifications,
    address,
  } = req.body;

  console.log(req.body);
  const subjects = subject.split(",").map((item) => item.trim());
  let connection;
  try {
    connection = await database.getConnection();

    await connection.beginTransaction();

    const insertTeacherQuery = `
      INSERT INTO Teacher (TeacherID, TeacherName, Designation, Department, Experience, OfficeLocation, Qualifications, Address, ContactNo, Email, Path)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const teacherPath = `${teacherID.toLowerCase()}-${name
      .toLowerCase()
      .replace(/\s+/g, "")}`;
    const teacherParams = [
      teacherID,
      name,
      designation,
      department,
      experience || 0,
      office,
      qualifications,
      address,
      contact,
      email,
      teacherPath,
    ];
    await connection.query(insertTeacherQuery, teacherParams);

    if (subjects && subjects.length > 0) {
      const subjectIds = [];
      console.log("subjects", subjects);
      for (const subjectName of subjects) {
        console.log(subjectName);
        const [subjectRows] = await connection.query(
          `SELECT SubjectID FROM Subjects WHERE SubjectName = ?`,
          [subjectName]
        );
        console.log(subjectRows);
        if (subjectRows.length > 0) {
          subjectIds.push(subjectRows[0].SubjectID);
        } else {
          const newSubjectCode = `CODE-${Math.random()
            .toString(36)
            .substring(2, 7)
            .toUpperCase()}`;
          await connection.query(
            `INSERT INTO Subjects (SubjectName, SubjectCode) VALUES (?, ?)`,
            [subjectName, newSubjectCode]
          );
          const [newSubjectID] = await connection.query(
            `SELECT SubjectID FROM Subjects WHERE SubjectName = ?`,
            [subjectName]
          );
          subjectIds.push(newSubjectID[0].SubjectID);
        }
      }

      const insertTeacherSubjectsQuery = `
        INSERT INTO TeacherSubjects (TeacherID, SubjectID)
        VALUES ?
      `;
      const teacherSubjectParams = subjectIds.map((subjectID) => [
        teacherID,
        subjectID,
      ]);
      await connection.query(insertTeacherSubjectsQuery, [
        teacherSubjectParams,
      ]);
    }

    await connection.commit();

    res
      .status(201)
      .json({ message: "Teacher and subjects added successfully!" });
  } catch (error) {
    console.error("Error in addTeacher:", error);

    if (connection) await connection.rollback();

    res.status(500).json({ error: "Server error" });
  } finally {
    if (connection) connection.release();
  }
};

export const editTeacher = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "No updates provided." });
  }

  console.log(req.params.teacherprofile);

  if (!req.params.teacherprofile) {
    return res
      .status(400)
      .json({ error: "Teacher profile identifier is not provided." });
  }

  const { Subjects, TeacherName, TeacherID } = req.body;
  let subject;
  if (Subjects) {
    subject = Subjects.map((item) => item.trim());
  }
  let connection;
  try {
    connection = await database.getConnection();
    await connection.beginTransaction();

    const teacherFilteredBody = Object.entries(req.body).reduce(
      (acc, [key, value]) => {
        if (value !== null && value !== "" && key !== "Subjects") {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    let newPath;
    if (TeacherID && TeacherName) {
      const sanitizedTeacherName = TeacherName.toLowerCase().replace(
        /\s+/g,
        ""
      );
      newPath = `${TeacherID}-${sanitizedTeacherName}`;
    } else if (TeacherID) {
      const [_, teacherName] = req.params.teacherprofile.split("-");
      newPath = `${TeacherID}-${teacherName}`;
      await connection.query(`SET FOREIGN_KEY_CHECKS = 0`);
    } else if (TeacherName) {
      const [teacherId] = req.params.teacherprofile.split("-");
      const sanitizedTeacherName = TeacherName.toLowerCase().replace(
        /\s+/g,
        ""
      );
      newPath = `${teacherId}-${sanitizedTeacherName}`;
    }

    if (newPath) {
      teacherFilteredBody["Path"] = newPath;
    }

    if (Object.keys(teacherFilteredBody).length > 0) {
      const teacherUpdates = Object.keys(teacherFilteredBody)
        .map((field) => `${field} = ?`)
        .join(", ");
      const teacherUpdateValues = Object.values(teacherFilteredBody);

      const updateQuery = `UPDATE Teacher SET ${teacherUpdates} WHERE Path = ?`;
      await connection.query(updateQuery, [
        ...teacherUpdateValues,
        req.params.teacherprofile,
      ]);
      if (TeacherID) {
        const [teacherId] = req.params.teacherprofile.split("-");

        await connection.query(
          `UPDATE TeacherSubjects SET TeacherID = ? WHERE TeacherID = ?`,
          [TeacherID, teacherId]
        );
        await connection.query(`SET FOREIGN_KEY_CHECKS = 1`);
      }
    }

    if (subject && subject.length > 0) {
      const [teacherId] = req.params.teacherprofile.split("-");

      const [currentSubjects] = await connection.query(
        `SELECT SubjectID FROM TeacherSubjects WHERE TeacherID = ?`,
        [teacherId]
      );
      const currentSubjectIds = currentSubjects.map((row) => row.SubjectID);

      const newSubjects = [];
      const providedSubjectIds = [];

      for (const subjectName of subject || []) {
        let [subjectRows] = await connection.query(
          `SELECT SubjectID FROM Subjects WHERE SubjectName = ?`,
          [subjectName]
        );

        if (subjectRows.length === 0) {
          const newSubjectCode = `CODE-${Math.random()
            .toString(36)
            .substring(2, 7)
            .toUpperCase()}`;

          await connection.query(
            `INSERT INTO Subjects (SubjectName, SubjectCode) VALUES (?, ?)`,
            [subjectName, newSubjectCode]
          );

          [subjectRows] = await connection.query(
            `SELECT SubjectID FROM Subjects WHERE SubjectName = ?`,
            [subjectName]
          );
        }

        providedSubjectIds.push(subjectRows[0].SubjectID);
        if (!currentSubjectIds.includes(subjectRows[0].SubjectID)) {
          newSubjects.push([teacherId, subjectRows[0].SubjectID]);
        }
      }

      const subjectsToRemove = currentSubjectIds.filter(
        (id) => !providedSubjectIds.includes(id)
      );

      if (newSubjects.length > 0) {
        const insertQuery = `INSERT INTO TeacherSubjects (TeacherID, SubjectID) VALUES ?`;
        await connection.query(insertQuery, [newSubjects]);
      }

      if (subjectsToRemove.length > 0) {
        const deleteQuery = `DELETE FROM TeacherSubjects WHERE TeacherID = ? AND SubjectID IN (?)`;
        await connection.query(deleteQuery, [teacherId, subjectsToRemove]);
      }
    }

    await connection.commit();
    res
      .status(200)
      .json({ message: "Teacher updated successfully.", Path: newPath || "" });
  } catch (error) {
    console.error("Error updating teacher:", error);
    if (connection) await connection.rollback();
    res.status(500).json({ error: "Server error." });
  } finally {
    if (connection) connection.release();
  }
};
