import db from "../config/database.js";
import database from "../config/database2.js";

export const getStudentsByYear = async (req, res) => {
  const yearParam = req.params.year;
  const year = parseInt(yearParam.replace("year-", ""), 10);
  const query = `SELECT DISTINCT branch, path FROM Student WHERE year = ?`;

  try {
    db.query(query, [year], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(400).json({
          error: "Database Error",
        });
      }
      if (result.length === 0) {
        return res
          .status(404)
          .json({ error: `No branches found for year ${year}` });
      }

      return res.json({
        message: "Successfully fetch branch",
        row: result,
      });
    });
  } catch (error) {
    console.error("Error fetching branch by year:", error);
    res.status(500).json({ error: "Database error" });
  }
};

export const getStudentsByBranch = async (req, res) => {
  const yearParam = req.params.year;
  const branchParam = req.params.branch;

  const branch = branchParam
    .replace(/(^\w|\-\s*\w)/g, (match) => match.toUpperCase())
    .replace("-", " ");
  const year = parseInt(yearParam.replace("year-", ""), 10);
  // console.log(year, branch);

  const query = `SELECT * FROM Student WHERE year = ? AND branch = ?`;
  try {
    db.query(query, [year, branch], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(400).json({
          error: "in database data is not found",
        });
      }
      if (result.length === 0) {
        return res.status(404).json({
          error: `No students found for year ${year} and branch ${branch}`,
        });
      }

      //   console.log(`Distinct branches for year, ${year}, : ${result}`);
      // result.map((branch) => console.log(branch));
      return res.json({
        message: "Successfully fetch Student",
        row: result,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

export const getStudentDetails = async (req, res) => {
  const { year, branch, studentprofile } = req.params;

  const yearParam = parseInt(year.replace("year-", ""), 10);
  const branchParam = branch
    .replace(/(^\w|\-\s*\w)/g, (match) => match.toUpperCase())
    .replace("-", " ");

  const query = `SELECT * FROM Student WHERE Year = ? AND Branch = ? AND studentPath = ?`;
  try {
    db.query(query, [yearParam, branchParam, studentprofile], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(400).json({
          error: "in database data is not found",
        });
      }
      if (result.length === 0) {
        return res.status(404).json({
          error: `Student ${studentprofile} not found in year ${year}, branch ${branch}`,
        });
      }

      //   console.log(`Distinct branches for year, ${year}, : ${result}`);
      // result.map((branch) => console.log(branch));
      return res.json({
        message: "Successfully fetch Student Profile",
        row: result,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

export const addStudent = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const { StudentName, Branch } = req.body;
  if (!StudentName || !Branch) {
    return res
      .status(400)
      .json({ error: "StudentName and Branch are required." });
  }
  const studentFilteredBody = Object.entries(req.body).reduce(
    (acc, [key, value]) => {
      if (value !== null && value !== "") {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  try {
    const studentKeys = Object.keys(studentFilteredBody).join(", ");

    const studentValues = Object.values(studentFilteredBody);

    const query = `INSERT INTO Student (${studentKeys}, StudentID, path, studentPath ) VALUES (${studentValues
      .map(() => "?")
      .join(", ")}, ?, ?, ? )`;

    const studentID = `S${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(3, "0")}`;

    const path = Branch.toLowerCase().replace(/\s+/g, "-");
    const studentPath = StudentName.toLowerCase().replace(/\s+/g, "-");

    db.query(
      query,
      [...studentValues, studentID, path, studentPath],
      (err, result) => {
        if (err) {
          console.error("Error adding student:", err);
          return res.status(500).json({ error: "Failed to add student" });
        }
        res.status(201).json({
          message: "Student added successfully",
        });
      }
    );
  } catch {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Failed to add student. Please try again." });
  }
};

export const editStudent = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "No updates provided." });
  }

  if (!req.params.studentprofile) {
    return res
      .status(400)
      .json({ error: "Student profile identifier is not provided." });
  }

  let connection;
  try {
    connection = await database.getConnection();
    await connection.beginTransaction();

    const studentFilteredBody = Object.entries(req.body).reduce(
      (acc, [key, value]) => {
        if (value !== null && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );

    let newStudentPath = "";
    if (req.body.StudentName) {
      const [studentID] = req.params.studentprofile.split("-");
      const sanitizedName = req.body.StudentName.toLowerCase().replace(
        /\s+/g,
        ""
      );
      newStudentPath = `${studentID}-${sanitizedName}`;
      studentFilteredBody["studentPath"] = newStudentPath;
    }
    let newBranchPath = "";
    if (req.body.Branch) {
      newBranchPath = req.body.Branch.toLowerCase().replace(/\s+/g, "-");
      studentFilteredBody["path"] = newBranchPath;
    }

    let newYear = "";
    if (req.body.Year) {
      newYear = `year-${req.body.Year}`;
    }


    if (Object.keys(studentFilteredBody).length > 0) {
      const updates = Object.keys(studentFilteredBody)
        .map((field) => `${field}=?`)
        .join(", ");
      const values = Object.values(studentFilteredBody);

      const query = `UPDATE Student SET ${updates} WHERE studentPath = ?`;

      await connection.query(query, [...values, req.params.studentprofile]);
    }

    await connection.commit();
    res.status(200).json({
      message: "Profile updated successfully!",
      studentPath: newStudentPath || "",
      path: newBranchPath || "",
      Year: newYear || "",
    });
  } catch (error) {
    console.error("Error updating student profile:", error);
    if (connection) await connection.rollback();
    res.status(500).json({ error: "Server error" });
  } finally {
    if (connection) await connection.release();
  }
};
